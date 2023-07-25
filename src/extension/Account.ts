import { TRANSACTION_TYPE } from "../enums/TRANSACTION_TYPE";
import { Customer } from "./Customer";
import { Transaction } from "./Transaction";

export class Account {
  private _balance: number;
  private _customer: Customer;
  private _transactions: Transaction[];

  constructor(customer: Customer) {
    this._balance = 0;
    this._customer = customer;
    this._transactions = [];
  }

  getBalance() {
    return this._balance;
  }

  withdraw(amount: number) {
    if (this._balance >= amount) {
      this._balance -= amount;
      this.createTransaction(amount, TRANSACTION_TYPE.DEBIT, new Date());
    } else {
      throw new Error("Insufficient funds");
    }
  }

  deposit(amount: number) {
    this._balance += amount;
    this.createTransaction(amount, TRANSACTION_TYPE.CREDIT, new Date());
  }

  createTransaction(
    amount: number,
    transactionType: TRANSACTION_TYPE,
    date: Date
  ): void {
    const transaction = new Transaction(transactionType, amount, this, date);
    this._transactions.push(transaction);
  }

  printBankStatement(): void {
    console.log(
      `${"date".padEnd(10)} || ${"credit".padEnd(10)} || ${"debit".padEnd(
        10
      )} || ${"balance".padEnd(10)}`
    );
    const dtf = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    let balance = 0;

    for (const transaction of this._transactions) {
      const date = dtf.format(transaction.getDate());
      const credit =
        transaction.getType() === TRANSACTION_TYPE.CREDIT
          ? transaction.getAmount().toString()
          : "";
      const debit =
        transaction.getType() === TRANSACTION_TYPE.DEBIT
          ? transaction.getAmount().toString()
          : "";
      balance = this.calcBalance(transaction, balance);
      const statementBalance = balance.toFixed(2);

      console.log(
        `${date.padEnd(10)} || ${credit.padEnd(10)} || ${debit.padEnd(
          10
        )} || ${statementBalance.padEnd(10)}`
      );
    }
  }

  printBankStatementBetween(startDate: Date, endDate: Date): void {}

  calcBalance(transaction: Transaction, currentBalance: number): number {
    return transaction.getType() === TRANSACTION_TYPE.CREDIT
      ? currentBalance + transaction.getAmount()
      : currentBalance - transaction.getAmount();
  }
}
