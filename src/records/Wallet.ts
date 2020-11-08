type Wallet = {
  address: string;
  publicKey: string;
  nonce: string;
  balance: string;
  attributes: {
    secondPublicKey?: string;
    delegate?: {
      username: string;
      voteBalance: string;
      forgedFees: string;
      forgedRewards: string;
      producedBlocks: number;
      rank: number;
      lastBlock: {
        version: number;
        timestamp: number;
        height: number;
        previousBlockHex: string;
        previousBlock: string;
        numberOfTransactions: number;
        totalAmount: string;
        totalFee: string;
        reward: string;
        payloadLength: number;
        payloadHash: string;
        generatorPublicKey: string;
        blockSignature: string;
        idHex: string;
        id: string;
      };
      round: number;
    };
    vote: string;
  };
  isDelegate: boolean;
  isResigned: boolean;
  vote: string;
  username?: string;
  secondPublicKey?: string;
};

export default Wallet;
