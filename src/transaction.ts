export class Transaction {
  constructor(
    private transactionType: TransactionType,
    private amount: number,
    private balanceAfterTransaction: number, 
    private date: string
  ) {}
}

export enum TransactionType {
  Credit,
  Debit,
}
