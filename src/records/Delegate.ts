import type Timestamp from './Timestamp';

type Delegate = {
  username: string;
  address: string;
  publicKey: string;
  votes: string;
  rank: number;
  isResigned: boolean;
  blocks: {
    produced: number;
    last: {
      id: string;
      height: number;
      timestamp: Timestamp;
    };
  };
  production: {
    approval: number;
  };
  forged: {
    fees: string;
    rewards: string;
    total: string;
  };
};

export default Delegate;
