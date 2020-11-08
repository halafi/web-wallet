import Delegate from '../../../records/Delegate';
import type Transaction from '../../../records/Transaction';
import type Wallet from '../../../records/Wallet';

const API = 'https://api.ark.io/api';

export const fetchWallet = (address: string): Promise<Wallet> =>
  new Promise<Wallet>((resolve, reject) =>
    fetch(`${API}/wallets/${address}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          reject(json.error);
        } else {
          resolve(json.data);
        }
      })
      .catch((err) => reject(String(err))),
  );

export const fetchTransactions = (address: string): Promise<Transaction[]> =>
  new Promise<Transaction[]>((resolve, reject) =>
    fetch(`${API}/wallets/${address}/transactions?orderBy=timestamp:desc&page=1&limit=20`)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          reject(json.error);
        } else {
          resolve(json.data);
        }
      })
      .catch((err) => reject(String(err))),
  );

export const fetchDelegates = (): Promise<Delegate[]> =>
  new Promise<Delegate[]>((resolve, reject) =>
    fetch(`${API}/delegates?page=1&limit=51`)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          reject(json.error);
        } else {
          resolve(json.data);
        }
      })
      .catch((err) => reject(String(err))),
  );
