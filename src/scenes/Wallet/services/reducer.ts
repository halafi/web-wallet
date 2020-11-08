import Delegate from '../../../records/Delegate';
import Transaction from '../../../records/Transaction';
import Wallet from '../../../records/Wallet';

const SET_WALLET = 'SET_WALLET';
const SET_DELEGATES = 'SET_DELEGATES';
const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
const SET_ERROR = 'SET_ERROR';

type SetWalletAction = {
  type: typeof SET_WALLET;
  payload: {
    wallet: Wallet;
  };
};

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

type SetErrorAction = {
  type: typeof SET_ERROR;
  payload: {
    error: string;
  };
};

export const setWallet = (wallet: Wallet): SetWalletAction => ({
  type: SET_WALLET,
  payload: {
    wallet,
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
  | SetWalletAction
  | SetErrorAction;

export type State = {
  wallet: Wallet | null;
  delegates: Delegate[];
  transactions: Transaction[];
  error: string | null;
};

const minesweeperReducer = (oldState: State, action: WalletActions): State => {
  switch (action.type) {
    case SET_WALLET:
      return { ...oldState, wallet: action.payload.wallet };
    case SET_DELEGATES:
      return { ...oldState, delegates: action.payload.delegates };
    case SET_TRANSACTIONS:
      return { ...oldState, transactions: action.payload.transactions };
    case SET_ERROR:
      return { ...oldState, error: action.payload.error };
    default:
      throw new Error();
  }
};

export default minesweeperReducer;
