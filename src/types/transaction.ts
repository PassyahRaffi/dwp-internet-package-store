export type TransactionStatus = 'success' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  customerId: string;
  packageId: string;
  packageName: string;
  provider: string;
  quota: string;
  price: number;
  status: TransactionStatus;
  date: string;
}

export type TransactionInput = Omit<Transaction, 'id'>;
