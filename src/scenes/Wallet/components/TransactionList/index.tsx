import React from 'react';
// import queryString from 'query-string';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { FaCheck, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa';
import { format } from 'date-fns';
import { formatPrice, getPayment, isDelegate, sumPayments, trimString } from '../../services/utils';
import classes from '../../../../tailwind';
import type Transaction from '../../../../records/Transaction';
import type Delegate from '../../../../records/Delegate';

type Props = {
  // wallet: Wallet | null;
  transactions: Transaction[];
  delegates: Delegate[];
  address: string;
};

const TransactionList = ({ transactions, delegates, address }: Props) => (
  <table className="mt-6 min-w-full bg-gray-800 text-gray-400 min-h-full">
    <thead>
      <tr className="text-gray-500 text-sm">
        <th className="p-2 text-left">ID</th>
        <th className="p-2">Date</th>
        <th className="p-2">Sender</th>
        <th className="p-2">Recipient</th>
        <th className="p-2 text-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((t) => {
        const senderDelegate = isDelegate(t.sender, delegates);
        const recipientDelegate = isDelegate(t.recipient, delegates);
        const isMultipayment = t.amount === '0' && t?.asset?.payments;
        const wasPaid = isMultipayment && getPayment(address, isMultipayment);
        const multipaymentTotal = isMultipayment
          ? sumPayments(isMultipayment, t.recipient === t.sender ? t.recipient : undefined)
          : t.amount;
        return (
          <tr key={t.id}>
            <td className="p-2 text-left">
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={`https://explorer.ark.io/transaction/${t.id}`}
                className={classnames('flex items-center text-blue-700', classes.link)}
              >
                {trimString(t.id)} <FaExternalLinkAlt className="ml-1" />
              </a>
            </td>
            <td className="p-2">
              {format(new Date(t.timestamp.unix * 1000), 'dd/MM/yyyy HH:mm:ss')}
            </td>
            <td>
              <Link to={`/wallet?address=${t.sender}`} className={classes.link}>
                {/* could also extend username recognition with known-wallets.json */}
                {(senderDelegate && senderDelegate.username) || trimString(t.sender)}
              </Link>
            </td>
            <td className="p-2">
              {t?.asset?.payments ? (
                <a
                  href={`https://explorer.ark.io/transaction/${t.id}`}
                  className={classnames(classes.link, 'flex items-center')}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Multipayment ({t.asset.payments.length}) <FaExternalLinkAlt className="ml-1" />
                </a>
              ) : (
                <Link to={`/wallet?address=${t.recipient}`} className={classes.link}>
                  {(recipientDelegate && recipientDelegate.username) || trimString(t.recipient)}
                </Link>
              )}
            </td>
            <td className="p-2 text-right flex items-center justify-end font-bold">
              {t.sender === address ? '-' : '+'}&nbsp;Ѧ&nbsp;
              {formatPrice(
                isMultipayment
                  ? (t.sender !== address && wasPaid && wasPaid?.amount) || multipaymentTotal
                  : t.amount,
                t.sender === address ? t.fee : undefined,
              )}
              {t.confirmations > 10 ? (
                <FaCheck className="ml-1 text-green-600" />
              ) : (
                <FaSpinner className="ml-1 text-gray-800" />
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default TransactionList;
