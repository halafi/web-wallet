import React, { useReducer, useEffect, Reducer } from 'react';
import type { State, WalletActions } from './services/reducer';
import minesweeperReducer, { setDelegates } from './services/reducer';
// import './Root.css';

const API = 'https://api.ark.io/api';
const Root = () => {
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
    <div className="my-4 mx-4 sm:mx-16 sm:my-8 p-4 rounded-lg w-full max-w-screen-xl bg-white">
      <h1>Walletizer</h1>
      <ul>
        {delegates.map((d) => (
          <li key={d.rank}>
            {d.rank}. {d.username} {d?.production?.approval || '0.00'}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Root;
