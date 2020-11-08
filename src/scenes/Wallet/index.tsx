import React, { useReducer, useEffect, Reducer } from 'react';
import queryString from 'query-string';
import { FaArrowLeft, FaExternalLinkAlt, FaCheck, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';
import classnames from 'classnames';
import { format } from 'date-fns';
import type { State, WalletActions } from './services/reducer';
import minesweeperReducer, { setDelegates, setTransactions, setWallet } from './services/reducer';
import { formatPrice, getPayment, isDelegate, sumPayments, trimString } from './services/utils';

const arkUsdRate = 0.330026; // TODO: unhardcode, can use https://min-api.cryptocompare.com/data/price?fsym=ARK&tsyms=USD

const clnames = {
  link: 'text-blue-600 font-bold',
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
    wallet: null,
  });
  const { delegates, transactions, wallet } = state;

  useEffect(() => {
    if (address) {
      const fetchWallet = async () => {
        fetch(`${API}/wallets/${address}`)
          .then((res) => res.json())
          .then((json) => dispatch(setWallet(json.data)))
          .catch((err) => console.error(err));
      };
      fetchWallet();
    }
    if (currentView === 'transactions' && address) {
      const fetchTransactions = async () => {
        fetch(`${API}/wallets/${address}/transactions?orderBy=timestamp:desc&page=1&limit=20`)
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
                {`${address}${
                  wallet?.attributes.delegate ? ` (${wallet?.attributes.delegate.username})` : ''
                }`}{' '}
                <FaExternalLinkAlt className="ml-1" />
              </a>
            </span>
            {wallet && (
              <span className="font-bold text-gray-700">
                Ѧ {formatPrice(wallet?.balance || 0.0)}{' '}
                <span className="ml-1 text-xs text-gray-900">
                  $
                  {formatPrice(wallet.balance ? Number(wallet.balance) * arkUsdRate : 0.0).toFixed(
                    2,
                  )}
                </span>
              </span>
            )}
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
                  <Link className={clnames.link} to={`/wallet?address=${d.address}`}>
                    {d.username}
                    {wallet && wallet.vote === d.publicKey ? (
                      <span className="p-1 ml-2 text-white text-xs rounded-md bg-red-700">Vote</span>
                    ) : (
                      ''
                    )}
                  </Link>
                </td>
                <td className="px-2 text-right">{d?.production?.approval || '0.00'}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {address && currentView === 'transactions' && (
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
              const wasPaid = isMultipayment && getPayment(address as string, isMultipayment);
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
                      className={classnames('flex items-center text-blue-700', clnames.link)}
                    >
                      {trimString(t.id)} <FaExternalLinkAlt className="ml-1" />
                    </a>
                  </td>
                  <td className="p-2">
                    {format(new Date(t.timestamp.unix * 1000), 'dd/MM/yyyy HH:mm:ss')}
                  </td>
                  <td>
                    <Link to={`/wallet?address=${t.sender}`} className={clnames.link}>
                      {/* could also extend username recognition with known-wallets.json */}
                      {(senderDelegate && senderDelegate.username) || trimString(t.sender)}
                    </Link>
                  </td>
                  <td className="p-2">
                    {t?.asset?.payments ? (
                      <a
                        href={`https://explorer.ark.io/transaction/${t.id}`}
                        className={classnames(clnames.link, 'flex items-center')}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Multipayment ({t.asset.payments.length}){' '}
                        <FaExternalLinkAlt className="ml-1" />
                      </a>
                    ) : (
                      <Link to={`/wallet?address=${t.recipient}`} className={clnames.link}>
                        {(recipientDelegate && recipientDelegate.username) ||
                          trimString(t.recipient)}
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
      )}
    </div>
  );
};

export default Wallet;
