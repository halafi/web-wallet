import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { formatPrice, trimString } from '../../services/utils';
import classes from '../../../../tailwind';
import type Wallet from '../../../../records/Wallet';

type Props = {
  wallets: string[];
  walletInfo: Wallet[];
};

const WalletList = ({ wallets, walletInfo }: Props) => (
  <table className="mt-6 min-w-full min-h-full bg-gray-800 text-gray-400">
    <thead>
      <tr className="text-gray-500 text-sm">
        <th className="p-2 text-left">Wallet</th>
        <th className="p-2 text-right">Balance</th>
      </tr>
    </thead>
    <tbody>
      {wallets.map((wal: string) => (
        <tr key={wal}>
          <td className="p-2 text-left text-sm sm:text-base">
            <Link
              className={classes.link}
              to={`/wallet?${queryString.stringify({ address: wal })}`}
            >
              {trimString(wal)}
            </Link>
          </td>
          <td className="p-2 text-right font-bold text-sm sm:text-base">
            Ѧ {formatPrice(walletInfo.find((w) => w.address === wal)?.balance || '0.00')}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default WalletList;
