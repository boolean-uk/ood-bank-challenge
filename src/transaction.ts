export class Transaction {
  constructor(
    private transactionType: TransactionType,
    private amount: number,
    private balanceAfterTransaction: number, 
    public date: string
  ) {}

  getTransactionDescription(): string{
    if (this.transactionType === TransactionType.Credit) {
        return this.date + " || " + this.amount + "    || " + "        || " + this.balanceAfterTransaction;
    } else {
        return this.date + " || " + "       || " + this.amount + "     || " + this.balanceAfterTransaction;
    }
  }

  getDate(): string{
    return this.date;
  }
}

export enum TransactionType {
  Credit,
  Debit,
}
