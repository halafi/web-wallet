import React, { useState } from 'react';
import classnames from 'classnames';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Identities } from '@arkecosystem/crypto';
import { Link } from 'react-router-dom';
import { trimString } from '../../scenes/Wallet/services/utils';
import classes from '../../tailwind';

type Props = {
  wallets: string[];
  setWallets: (wallets: string[]) => void;
};

const { localStorage } = window;

const WalletSidebar = ({ wallets, setWallets }: Props) => {
  const [value, setValue] = useState('');

  // TODO: some hardcap on maximum of added addresses maybe
  const isValidAddress = Identities.Address.validate(value);
  const isValidPublicKey = Identities.PublicKey.validate(value);
  const isValid = isValidAddress || isValidPublicKey;

  return (
    <aside id="sidebar" className="p-2 sm:p-4 rounded bg-gray-800 custom-sidebar-h">
      {/* <button type="button">Create Wallet</button> */}
      <Link to="/wallet?view=create" className={classes.link}>
        Create New Wallet
      </Link>
      <form
        className="my-2"
        onSubmit={(ev) => {
          ev.preventDefault();
          if (isValid && !wallets.includes(value)) {
            const newWallets = isValidPublicKey
              ? wallets.concat(Identities.Address.fromPublicKey(value))
              : wallets.concat(value);
            setWallets(newWallets);
            localStorage.setItem('wallets', newWallets.join(','));
            setValue('');
          }
        }}
      >
        <label htmlFor="address" className="text-gray-200">
          Import Wallet
          <input
            id="address"
            className="w-full py-1 px-2 mt-1 text-sm rounded text-black"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Address"
          />
        </label>
        <div className="flex justify-end">
          <button
            type="submit"
            className={classnames(
              'mt-3 border-2 bg-gray-700 border-gray-700 rounded-3xl p-1 text-gray-300',
              {
                'cursor-not-allowed text-gray-600': !isValid,
                'hover:text-gray-500': isValid,
              },
            )}
          >
            <FaPlus />
          </button>
        </div>
      </form>
      <hr className="my-3" />
      <div className="overflow-y-auto h-32 sm:h-full">
        {wallets.map((w) => (
          <div
            key={w}
            className="flex items-center justify-between cursor-pointer text-gray-300 my-2"
          >
            <Link className={classes.link} to={`/wallet?address=${w}`}>
              {trimString(w)}
            </Link>
            <FaTrash
              className="cursor-pointer"
              onClick={() => {
                const newWallets = wallets.filter((wallet) => wallet !== w);
                setWallets(newWallets);
                localStorage.setItem('wallets', newWallets.join(','));
              }}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default WalletSidebar;
