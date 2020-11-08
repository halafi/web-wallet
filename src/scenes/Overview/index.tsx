import React, { useReducer, useEffect, Reducer } from 'react';
// import { FaWallet, FaAddressBook, FaNewspaper, FaPuzzlePiece } from 'react-icons/fa';
// import type { State, WalletActions } from './services/reducer';
// import minesweeperReducer, { setDelegates } from './services/reducer';

// const API = 'https://api.ark.io/api';
const Overview = () => {
  // https://api.ark.io/api/delegates?page=1&limit=100
  // const [state, dispatch] = useReducer<Reducer<State, WalletActions>>(minesweeperReducer, {
  //   delegates: [],
  // });
  // const { delegates } = state;

  // useEffect(() => {
  //   const fetchDelegates = async () => {
  //     fetch(`${API}/delegates?page=1&limit=51`)
  //       .then((res) => res.json())
  //       .then((json) => dispatch(setDelegates(json.data)))
  //       .catch((err) => console.error(err));
  //   };
  //   fetchDelegates();
  // }, []);

  return <div>Welcome</div>;
};

export default Overview;
