import { Decimal } from "decimal.js";

export class Account {
  private _transactions: { date: Date; amount: Decimal }[] = [];

  get transactions() {
    return this._transactions;
  }

  get balance() {
    return this._transactions.reduce(
      (acc: Decimal, transaction: { date: Date; amount: Decimal }) => acc.plus(transaction.amount),
      new Decimal(0)
    );
  }

  deposit(amount: Decimal, date: Date = new Date()) {
    this._transactions.push({ date, amount });
  }
  withdraw(amount: Decimal, date: Date = new Date()) {
    this._transactions.push({ date, amount: amount.times(-1) });
  }
}
