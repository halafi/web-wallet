import Delegate from '../../../records/Delegate';
import Transaction from '../../../records/Transaction';
import Wallet from '../../../records/Wallet';
import { sumWallets } from './utils';

const SET_DELEGATES = 'SET_DELEGATES';
const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
const SET_WALLET_INFO = 'SET_WALLET_INFO';
const SET_ERROR = 'SET_ERROR';

type SetDelegatesAction = {
  type: typeof SET_DELEGATES;
  payload: {
    delegates: Delegate[];
  };
};

type SetTransactionsAction = {
  type: typeof SET_TRANSACTIONS;
  payload: {
    transactions: Transaction[];
  };
};

type SetWalletInfoAction = {
  type: typeof SET_WALLET_INFO;
  payload: {
    walletInfo: Wallet[];
  };
};

type SetErrorAction = {
  type: typeof SET_ERROR;
  payload: {
    error: string;
  };
};

export const setWalletInfo = (walletInfo: Wallet[]): SetWalletInfoAction => ({
  type: SET_WALLET_INFO,
  payload: {
    walletInfo,
  },
});

export const setDelegates = (delegates: Delegate[]): SetDelegatesAction => ({
  type: SET_DELEGATES,
  payload: {
    delegates,
  },
});

export const setTransactions = (transactions: Transaction[]): SetTransactionsAction => ({
  type: SET_TRANSACTIONS,
  payload: {
    transactions,
  },
});

export const setError = (error: string): SetErrorAction => ({
  type: SET_ERROR,
  payload: {
    error,
  },
});

export type WalletActions =
  | SetDelegatesAction
  | SetTransactionsAction
  | SetWalletInfoAction
  | SetErrorAction;

export type State = {
  delegates: Delegate[];
  transactions: Transaction[];
  error: string | null;
  walletInfo: Wallet[];
  totalArkAmount: number;
};

const minesweeperReducer = (oldState: State, action: WalletActions): State => {
  switch (action.type) {
    case SET_DELEGATES:
      return { ...oldState, delegates: action.payload.delegates };
    case SET_TRANSACTIONS:
      return { ...oldState, transactions: action.payload.transactions };
    case SET_WALLET_INFO:
      return {
        ...oldState,
        walletInfo: action.payload.walletInfo,
        totalArkAmount: sumWallets(action.payload.walletInfo),
      };
    case SET_ERROR:
      return { ...oldState, error: action.payload.error };
    default:
      throw new Error();
  }
};

export default minesweeperReducer;
