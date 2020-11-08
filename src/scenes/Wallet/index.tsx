import React, { useReducer, useEffect, Reducer } from 'react';
import queryString from 'query-string';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';
import type { State, WalletActions } from './services/reducer';
import minesweeperReducer, { setDelegates } from './services/reducer';

const API = 'https://api.ark.io/api';

type Props = RouteProps & {};

const Wallet = ({ location }: Props) => {
  const query = location?.search || '';
  const queryParams = queryString.parse(query);
  const { address } = queryParams;
  console.log(queryParams);

  // https://api.ark.io/api/delegates?page=1&limit=100
  const [state, dispatch] = useReducer<Reducer<State, WalletActions>>(minesweeperReducer, {
    delegates: [],
  });
  const { delegates } = state;

  useEffect(() => {
    const fetchDelegates = async () => {
      fetch(`${API}/delegates?page=1&limit=51`)
        .then((res) => res.json())
        .then((json) => dispatch(setDelegates(json.data)))
        .catch((err) => console.error(err));
    };
    fetchDelegates();
  }, []);

  return (
    <div>
      {address && (
        <>
          <div className="flex flex-col justify-center h-20">
            <span>Wallet address: {address}</span>
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
              className="py-2 px-4 flex items-center bg-gray-800 text-gray-400 hover:text-white"
            >
              Transactions
            </Link>
            <Link
              to={`/wallet?${queryString.stringify({ ...queryParams, view: 'delegates' })}`}
              className="py-2 px-4 flex items-center bg-gray-800 text-gray-400 hover:text-white"
            >
              Delegates
            </Link>
          </nav>
        </>
      )}
      <ul className="mt-6">
        {delegates.map((d) => (
          <li key={d.rank}>
            <Link to={`/wallet?address=${d.address}`}>
              {d.rank}. {d.username} {d?.production?.approval || '0.00'}%
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wallet;
