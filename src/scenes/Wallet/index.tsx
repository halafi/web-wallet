import React, { useReducer, useEffect, Reducer } from 'react';
import queryString from 'query-string';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';
import classnames from 'classnames';
import type { State, WalletActions } from './services/reducer';
import minesweeperReducer, {
  setDelegates,
  setTransactions,
  setWalletInfo,
  setError,
} from './services/reducer';
import { formatPrice } from './services/utils';
import classes from '../../tailwind';
import { fetchDelegates, fetchTransactions, fetchWallet } from './services/api';
import WalletList from './components/WalletList';
import DelegateList from './components/DelegateList';
import TransactionList from './components/TransactionList';
import WalletCreation from './scenes/WalletCreation';

const arkUsdRate = 0.330026; // TODO: unhardcode, can use https://min-api.cryptocompare.com/data/price?fsym=ARK&tsyms=USD

type View = 'delegates' | 'transactions' | 'create';
type Props = RouteProps & {
  wallets: string[];
  setWallets: (wallets: string[]) => void;
};

const Wallet = ({ location, wallets, setWallets }: Props) => {
  const query = location?.search || '';
  const queryParams = queryString.parse(query);
  const { address, view } = queryParams;
  const currentView: View = (view as View) || 'transactions';

  // https://api.ark.io/api/delegates?page=1&limit=100
  const [state, dispatch] = useReducer<Reducer<State, WalletActions>>(minesweeperReducer, {
    delegates: [],
    transactions: [],
    error: null,
    walletInfo: [],
    totalArkAmount: 0,
  });
  const { delegates, transactions, error, walletInfo, totalArkAmount } = state;

  const wallet = address ? walletInfo.find((x) => x.address === address) || null : null;

  useEffect(() => {
    if (wallets.length || address) {
      // refetch wallets for each address
      // clear out duplicates
      // TODO: response caching, referesh button etc.
      const walletsWithAddress = Array.from(new Set(wallets.concat(address as string))); // remove
      Promise.all(walletsWithAddress.map((a) => fetchWallet(a)))
        .then((res) => dispatch(setWalletInfo(res)))
        .catch((err) => dispatch(setError(err)));
    }
    // Retrieve the Cryptography Configuration
    // https://api.ark.io/api/node/configuration/crypto
    if (currentView === 'transactions' && address) {
      fetchTransactions(address as string)
        .then((res) => dispatch(setTransactions(res)))
        .catch((err) => dispatch(setError(err)));
    }
    if (!delegates.length) {
      fetchDelegates()
        .then((res) => dispatch(setDelegates(res)))
        .catch((err) => dispatch(setError(err)));
    }
  }, [currentView, address, wallets]);

  return (
    <div>
      {error && <div className="p-4 rounded bg-red-700 text-white text-sm">API Error: {error}</div>}
      {view === 'create' && <WalletCreation />}
      {!address && view !== 'create' && (
        <>
          {Boolean(wallets.length) && (
            <div className="flex flex-col justify-center h-20 whitespace-no-wrap">
              Total balance
              <span className="font-bold text-gray-700">
                Ѧ {formatPrice(totalArkAmount)}{' '}
                <span className="ml-1 text-xs text-gray-900">
                  ${formatPrice(totalArkAmount * arkUsdRate).toFixed(2)}
                </span>
              </span>
            </div>
          )}
          <div className="flex flex-col">
            {wallets.length ? (
              <>
                <div className="flex justify-between">
                  Your wallets:{' '}
                  <Link
                    to="/wallet?view=create"
                    className={classnames(classes.link, 'mb-2 text-blue-800')}
                  >
                    Create new wallet
                  </Link>
                </div>
                <WalletList wallets={wallets} walletInfo={walletInfo} />
              </>
            ) : (
              <div className="self-center h-32 flex items-center text-center">
                You have no wallets imported.
                <br />
                <Link to="/wallet?view=create" className={classes.link}>
                  Create new wallet
                </Link>
                &nbsp;or import one in the sidebar.
              </div>
            )}
          </div>
        </>
      )}
      {address && (
        <>
          <div className="flex flex-col justify-center h-20">
            <span>
              Wallet address:{' '}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={`https://explorer.ark.io/wallets/${address}`}
                className={classnames('flex items-center', classes.link)}
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
      {address && currentView === 'delegates' && (
        <DelegateList delegates={delegates} wallet={wallet} />
      )}
      {address && currentView === 'transactions' && (
        <TransactionList
          transactions={transactions}
          address={address as string}
          delegates={delegates}
        />
      )}
    </div>
  );
};

export default Wallet;
