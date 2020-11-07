const SET_DELEGATES = 'SET_DELEGATES';

type Delegate = any;

type SetDelegatesAction = {
  type: typeof SET_DELEGATES;
  payload: {
    delegates: Delegate[];
  };
};

export const setDelegates = (delegates: Delegate[]): SetDelegatesAction => ({
  type: SET_DELEGATES,
  payload: {
    delegates,
  },
});

export type WalletActions = SetDelegatesAction;

export type State = {
  delegates: Delegate[];
};

const minesweeperReducer = (oldState: State, action: SetDelegatesAction): State => {
  switch (action.type) {
    case SET_DELEGATES:
      return { ...oldState, delegates: action.payload.delegates };
    default:
      throw new Error();
  }
};

export default minesweeperReducer;
