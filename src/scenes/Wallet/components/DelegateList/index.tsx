import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { formatPrice, trimString } from '../../services/utils';
import classes from '../../../../tailwind';
import type Wallet from '../../../../records/Wallet';
import Delegate from '../../../../records/Delegate';

type Props = {
  wallet: Wallet | null;
  delegates: Delegate[];
};

const DelegateList = ({ delegates, wallet }: Props) => (
  <table className="mt-6 min-w-full bg-gray-800 text-gray-400 min-h-full">
    <thead>
      <tr className="text-gray-500 text-sm">
        <th className="p-2 text-center w-4">Rank</th>
        <th className="p-2 text-left">Username</th>
        <th className="p-2 text-right">Vote %</th>
      </tr>
    </thead>
    <tbody>
      {delegates.map((d) => (
        <tr key={d.rank} className="text-sm">
          <td className="px-2 text-center w-4">{d.rank}</td>
          <td className="px-2">
            <Link className={classes.link} to={`/wallet?address=${d.address}`}>
              {d.username}
              {wallet && wallet.vote === d.publicKey && (
                <span className="p-1 ml-2 text-white text-xs rounded-md bg-red-700">Vote</span>
              )}
            </Link>
          </td>
          <td className="px-2 text-right">{d?.production?.approval || '0.00'}%</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default DelegateList;
