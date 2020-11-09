import type Delegate from '../../../records/Delegate';
import type Wallet from '../../../records/Wallet';
import type { Payment } from '../../../records/Transaction';

export const trimString = (id: string) =>
  id.length > 13 ? `${id.slice(0, 5)}...${id.slice(id.length - 5, id.length)}` : id;

export const isDelegate = (address: string, delegates: Delegate[]): false | Delegate =>
  delegates.find((d) => d.address === address) || false;

export const formatPrice = (input: string | number, fee?: string): number =>
  (Number(input) + Number(fee || 0)) / 100000000;

export const getPayment = (address: string, payments: Payment[]) =>
  payments.find((p) => p.recipientId === address);

export const sumWallets = (wallets: Wallet[]): number =>
  wallets.reduce((acc, w) => acc + Number(w.balance), 0);

export const sumPayments = (payments: Payment[], filterAddress?: string) =>
  payments
    .filter((p) => p.recipientId !== filterAddress)
    .reduce((acc, p) => acc + Number(p.amount), 0);
