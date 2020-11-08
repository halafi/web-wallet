import React, { useState } from 'react';
import classnames from 'classnames';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { trimString } from '../../scenes/Wallet/services/utils';
import classes from '../../tailwind';

const ADDRESS_LENGTH = 34;

type Props = {
  wallets: string[];
  setWallets: (wallets: string[]) => void;
};

const { localStorage } = window;

const WalletSidebar = ({ wallets, setWallets }: Props) => {
  const [address, setAddress] = useState('');

  const validAddress = address && address.length === ADDRESS_LENGTH;

  return (
    <aside id="sidebar" className="p-4 rounded bg-gray-800 custom-h">
      {/* <button type="button">Create Wallet</button> */}
      <form
        className="mb-2"
        onSubmit={(ev) => {
          ev.preventDefault();
          if (validAddress && !wallets.includes(address)) {
            // TODO: store / load via local storage
            // TODO: arkecosystem/crypto
            // TODO: import based on public key
            const newWallets = wallets.concat(address);
            setWallets(newWallets);
            localStorage.setItem('wallets', newWallets.join(','));
            setAddress('');
          }
        }}
      >
        <label htmlFor="address" className="text-gray-200">
          Import Wallet
          <input
            id="address"
            className="w-full py-1 px-2 mt-1 text-sm rounded text-black"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </label>
        <div className="flex justify-end">
          <button
            type="submit"
            className={classnames(
              'mt-3 border-2 bg-gray-700 border-gray-700 rounded-3xl p-1 text-gray-300',
              {
                'cursor-not-allowed text-gray-600': !validAddress,
                'hover:text-gray-500': validAddress,
              },
            )}
          >
            <FaPlus />
          </button>
        </div>
      </form>
      <hr className="my-3" />
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
    </aside>
  );
};

export default WalletSidebar;
