import React, { useReducer, useEffect, Reducer } from 'react';
import { FaWallet, FaAddressBook, FaNewspaper, FaPuzzlePiece } from 'react-icons/fa';
import type { State, WalletActions } from './services/reducer';
import minesweeperReducer, { setDelegates } from './services/reducer';

import './wallet.css';

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
    <div className="my-4 mx-4 sm:mx-16 sm:my-8 rounded-lg w-full max-w-screen-xl bg-black flex">
      <div id="menu" className="w-22 bg-black pr-2">
        <img src="./logo192.webp" alt="ark logo" className="w-20 h-20" />
        <nav className="text-white bg-gray-700 mt-2 rounded">
          <div className="p-4 flex justify-center items-center">
            <FaWallet size={30} />
          </div>
          <div className="p-4 flex justify-center items-center">
            <FaAddressBook size={30} />
          </div>
          <div className="p-4 flex justify-center items-center">
            <FaNewspaper size={30} />
          </div>
          <div className="p-4 flex justify-center items-center">
            <FaPuzzlePiece size={30} />
          </div>
        </nav>
      </div>
      <main id="main" className="grid grid-cols-4 gap-2 w-full">
        <div className="col-span-3 p-4 rounded bg-gradient-to-r from-gray-200 to-gray-600 overflow-y-auto max-h-custom">
          <ul>
            {delegates.map((d) => (
              <li key={d.rank}>
                {d.rank}. {d.username} {d?.production?.approval || '0.00'}%
              </li>
            ))}
          </ul>
        </div>
        <aside id="sidebar" className="p-4 rounded bg-gray-600 max-h-custom">
          <button type="button">Create Wallet</button>
          <button type="button">Import Wallet</button>
        </aside>
      </main>
    </div>
  );
};

export default Root;
