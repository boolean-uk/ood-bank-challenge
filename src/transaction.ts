export class Transaction {
  constructor(
    private transactionType: TransactionType,
    private amount: number,
    private balanceAfterTransaction: number, 
    private date: Date
  ) {}
}

enum TransactionType {
  Credit,
  Debit,
}
