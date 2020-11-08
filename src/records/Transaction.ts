import type Timestamp from './Timestamp';

export type Payment = {
  amount: string;
  recipientId: string;
};

type Transaction = {
  id: string;
  blockId: string;
  version: number;
  type: number;
  typeGroup: number;
  amount: string;
  fee: string;
  sender: string;
  senderPublicKey: string;
  recipient: string;
  signature: string;
  signSignature: string;
  vendorField: string;
  confirmations: number;
  timestamp: Timestamp;
  nonce: string;
  asset?: {
    payments?: Payment[];
    delegate?: { username: string };
  };
};

export default Transaction;
