import { Decimal } from "decimal.js";
import fs from "fs";
import { ACCOUNTS_PATH, getAccounts, getLastAccountNo } from "./bank";
import { Statement } from "./statement";
import { Transaction } from "./transaction";

export class Account {
  constructor(private _id: string) {}

  toJsonObject() {
    return {
      id: this.id,
      transactions: this.transactions.map((transaction) => transaction.toJSON()),
    };
  }

  get id() {
    return this._id;
  }

  get transactions(): Transaction[] {
    return this.loadTransactions();
  }

  get balance() {
    return this.transactions.reduce(
      (acc: Decimal, transaction: Transaction) => acc.plus(transaction.amount),
      new Decimal(0)
    );
  }

  getStatement(startDate?: Date, endDate?: Date) {
    return new Statement(this, startDate, endDate);
  }

  deposit(amount: Decimal, date: Date = new Date()) {
    const transactions = this.transactions;
    transactions.push(new Transaction(date, amount));
    this.saveTransactions(transactions);
  }

  withdraw(amount: Decimal, date: Date = new Date()) {
    if (amount.greaterThan(this.balance)) {
      throw "Insufficient funds!";
    }

    const transactions = this.transactions;
    transactions.push(new Transaction(date, amount.times(-1)));
    this.saveTransactions(transactions);
  }

  saveTransactions(transactions: Transaction[]) {
    const accounts = getAccounts();
    const accountIndex = accounts.findIndex(
      (account: { id: string; transactions: [] }) => account.id === this.id
    );
    if (accountIndex > -1) {
      accounts[accountIndex].transactions = transactions.map((transaction) => transaction.toJSON());
      const lastAccountNo = getLastAccountNo();
      fs.writeFileSync(ACCOUNTS_PATH, JSON.stringify({ lastAccountNo, accounts }, null, 2));
    }
  }

  loadTransactions(): Transaction[] {
    const accounts = getAccounts();
    const account = accounts.find(
      (account: { id: string; transactions: [] }) => account.id === this.id
    );
    if (!account) {
      return [];
    }
    return account.transactions.map((transaction: { date: string; amount: string }) =>
      Transaction.fromJSON(transaction)
    );
  }
}
