export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
}

export class Transaction {
  private date: Date;
  private amount: number;
  private type: TransactionType;

  constructor(date: Date, amount: number, type: TransactionType) {
    this.date = date;
    this.amount = amount;
    this.type = type; // 'deposit' or 'withdrawal'
  }

  getDate(): Date {
    return this.date;
  }

  getAmount(): number {
    return this.amount;
  }

  getType(): TransactionType {
    return this.type;
  }

  toString(): string {
    return `Transaction: ${this.date.toISOString()}, ${this.amount}, ${
      this.type
    }`;
  }
}
