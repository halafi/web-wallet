import React, { useReducer, useEffect, Reducer } from 'react';
import queryString from 'query-string';
import { FaArrowLeft, FaExternalLinkAlt, FaCheck, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';
import classnames from 'classnames';
import { format } from 'date-fns';
import type { State, WalletActions } from './services/reducer';
import minesweeperReducer, { setDelegates, setTransactions } from './services/reducer';
import { formatPrice, getPayment, isDelegate, trimString } from './services/utils';

const clnames = {
  link: 'text-blue-700 font-bold',
};

const API = 'https://api.ark.io/api';

type View = 'delegates' | 'transactions';
type Props = RouteProps & {};

const Wallet = ({ location }: Props) => {
  const query = location?.search || '';
  const queryParams = queryString.parse(query);
  const { address, view } = queryParams;
  const currentView: View = (view as View) || 'transactions';

  // TODO: error handling
  // TODO: wallet ARk amount

  // https://api.ark.io/api/delegates?page=1&limit=100
  const [state, dispatch] = useReducer<Reducer<State, WalletActions>>(minesweeperReducer, {
    delegates: [],
    transactions: [],
  });
  const { delegates, transactions } = state;

  useEffect(() => {
    if (currentView === 'transactions' && address) {
      const fetchTransactions = async () => {
        fetch(`${API}/wallets/${address}/transactions?orderBy=timestamp:desc&page=1&limit=10`)
          .then((res) => res.json())
          .then((json) => dispatch(setTransactions(json.data)))
          .catch((err) => console.error(err));
      };
      fetchTransactions();
    }
    const fetchDelegates = async () => {
      fetch(`${API}/delegates?page=1&limit=51`)
        .then((res) => res.json())
        .then((json) => dispatch(setDelegates(json.data)))
        .catch((err) => console.error(err));
    };
    fetchDelegates();
  }, [currentView, address]);

  return (
    <div>
      {address && (
        <>
          <div className="flex flex-col justify-center h-20">
            <span>
              Wallet address:{' '}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={`https://explorer.ark.io/wallets/${address}`}
                className={classnames('flex items-center', clnames.link)}
              >
                {address} <FaExternalLinkAlt className="ml-1" />
              </a>
            </span>
            <span>Ѧ 0.00 $0.00</span>
          </div>
          <nav className="flex">
            <Link
              to="/wallet"
              className="py-2 px-4 flex items-center bg-gray-800 text-gray-400 hover:text-white"
            >
              <FaArrowLeft /> Back
            </Link>
            <Link
              to={`/wallet?${queryString.stringify({ address })}`}
              className={classnames('py-2 px-4 flex items-center hover:text-white', {
                'text-white bg-gray-700': currentView === 'transactions',
                'text-gray-400 bg-gray-800': currentView !== 'transactions',
              })}
            >
              Transactions
            </Link>
            <Link
              to={`/wallet?${queryString.stringify({ ...queryParams, view: 'delegates' })}`}
              className={classnames('py-2 px-4 flex items-center hover:text-white', {
                'text-white bg-gray-700': currentView === 'delegates',
                'text-gray-400 bg-gray-800': currentView !== 'delegates',
              })}
            >
              Delegates
            </Link>
          </nav>
        </>
      )}
      {(!address || currentView === 'delegates') && (
        <ul className="mt-6">
          {delegates.map((d) => (
            <li key={d.rank}>
              <Link to={`/wallet?address=${d.address}`}>
                {d.rank}. {d.username} {d?.production?.approval || '0.00'}%
              </Link>
            </li>
          ))}
        </ul>
      )}
      {(address || currentView === 'transactions') && (
        <table className="mt-6">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Sender</th>
              <th>Recipient</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => {
              const senderDelegate = isDelegate(t.sender, delegates);
              const recipientDelegate = isDelegate(t.recipient, delegates);
              return (
                <tr key={t.id}>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={`https://explorer.ark.io/transaction/${t.id}`}
                      className={classnames('flex items-center text-blue-700', clnames.link)}
                    >
                      {trimString(t.id)} <FaExternalLinkAlt className="ml-1" />
                    </a>
                  </td>
                  <td>{format(new Date(t.timestamp.unix * 1000), 'dd/MM/yyyy HH:mm:ss')}</td>
                  <td>
                    <Link to={`/wallet?address=${t.sender}`} className={clnames.link}>
                      {(senderDelegate && senderDelegate.username) || trimString(t.sender)}
                    </Link>
                  </td>
                  <td>
                    {t?.asset?.payments ? (
                      <a
                        href={`https://explorer.ark.io/transaction/${t.id}`}
                        className={classnames(clnames.link, 'flex items-center')}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Multiplayment ({t.asset.payments.length}){' '}
                        <FaExternalLinkAlt className="ml-1" />
                      </a>
                    ) : (
                      <Link to={`/wallet?address=${t.recipient}`} className={clnames.link}>
                        {(recipientDelegate && recipientDelegate.username) ||
                          trimString(t.recipient)}
                      </Link>
                    )}
                  </td>
                  <td className="flex items-center justify-end">
                    {t.sender === address ? '-' : '+'}&nbsp;Ѧ&nbsp;
                    {formatPrice(
                      t.amount === '0' && t?.asset?.payments
                        ? getPayment(address as string, t.asset.payments)?.amount || '?'
                        : t.amount,
                    )}
                    {t.confirmations > 10 ? (
                      <FaCheck className="ml-1 text-green-800" />
                    ) : (
                      <FaSpinner className="ml-1 text-gray-800" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Wallet;
