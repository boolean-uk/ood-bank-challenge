import { differenceInMonths, isAfter, subYears } from "date-fns";
import { Decimal } from "decimal.js";
import fs from "fs";
import { ACCOUNTS_PATH, getAccounts, getLastAccountNo } from "./bank";
import { Statement } from "./statement";
import { Transaction } from "./transaction";

const OVERDRAFT_LIMIT_AMOUNT = new Decimal(500);

export class Account {
  constructor(private _id: string, private _overdraftAllowed: boolean = false) {}

  toJsonObject() {
    return {
      id: this.id,
      transactions: this.transactions.map((transaction) => transaction.toJSON()),
    };
  }

  get id() {
    return this._id;
  }

  get overdraftAllowed() {
    return this._overdraftAllowed;
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

  allowOverdraft() {
    this._overdraftAllowed = true;
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
    if (
      amount.greaterThan(
        this.balance.plus(this.overdraftAllowed ? OVERDRAFT_LIMIT_AMOUNT : new Decimal(0))
      )
    ) {
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

export class SavingsAccount extends Account {
  private SAVINGS_DEPOSIT_LIMIT = new Decimal(20000);

  constructor(id: string) {
    super(id, false);
  }

  deposit(amount: Decimal, date: Date = new Date()) {
    const oneYearAgo = subYears(date, 1);
    const totalDepositsLastYear = this.transactions
      .filter((transaction) => isAfter(transaction.date, oneYearAgo))
      .reduce((total, transaction) => total.plus(transaction.amount), new Decimal(0));

    if (totalDepositsLastYear.plus(amount).greaterThan(new Decimal(20000))) {
      throw "Deposit limit exceeded";
    }

    const transactions = this.transactions;
    transactions.push(new Transaction(date, amount));
    this.saveTransactions(transactions);
  }
}

export class InvestmentAccount extends Account {
  private INTEREST_RATE = new Decimal(0.02);

  constructor(id: string) {
    super(id, false);
  }

  calculateInterest(date: Date): Decimal {
    const transactions = this.loadTransactions();
    let totalInterest = new Decimal(0);

    transactions.forEach((transaction: Transaction) => {
      if (isAfter(date, transaction.date)) {
        const monthsSinceTransaction = differenceInMonths(date, transaction.date);
        const interest = new Decimal(transaction.amount)
          .times(this.INTEREST_RATE)
          .times(monthsSinceTransaction);
        totalInterest = totalInterest.plus(interest);
      }
    });

    return totalInterest;
  }
}

export class CheckingAccount extends Account {
  constructor(id: string) {
    super(id, true);
  }
}
