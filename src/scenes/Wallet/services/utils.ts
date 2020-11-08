import type Delegate from '../../../records/Delegate';
import type { Payment } from '../../../records/Transaction';

export const trimString = (id: string) =>
  id.length > 13 ? `${id.slice(0, 5)}...${id.slice(id.length - 5, id.length)}` : id;

export const isDelegate = (address: string, delegates: Delegate[]): false | Delegate =>
  delegates.find((d) => d.address === address) || false;

export const formatPrice = (input: string) => `${Number(input) / 100000000}`;
export const getPayment = (address: string, payments: Payment[]) =>
  payments.find((p) => p.recipientId === address);
