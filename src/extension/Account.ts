import { TRANSACTION_TYPE } from "../enums/TRANSACTION_TYPE";
import { Customer } from "./Customer";
import { Transaction } from "./Transaction";

export class Account {
  private _customer: Customer;
  private _transactions: Transaction[];
  private _overdraftAmount: number;

  constructor(customer: Customer) {
    this._customer = customer;
    this._transactions = [];
    this._overdraftAmount = 0;
  }

  withdraw(amount: number) {
    const availableBalance = this.getBalance() + this._overdraftAmount;
    if (availableBalance >= amount) {
      this.createTransaction(amount, TRANSACTION_TYPE.DEBIT, new Date());
    } else {
      throw new Error("Insufficient funds");
    }
  }

  deposit(amount: number): void {
    this.createTransaction(amount, TRANSACTION_TYPE.CREDIT, new Date());
  }

  requestOverdraft(amount: number) {
    this._overdraftAmount = amount;
  }

  getBalance(): number {
    let balance: number = 0;

    for (const transaction of this._transactions) {
      if (transaction.getType() === TRANSACTION_TYPE.CREDIT) {
        balance = balance + transaction.getAmount();
      }
      if (transaction.getType() === TRANSACTION_TYPE.DEBIT) {
        balance = balance - transaction.getAmount();
      }
    }

    return balance;
  }

  createTransaction(
    amount: number,
    transactionType: TRANSACTION_TYPE,
    date: Date
  ): void {
    const transaction = new Transaction(transactionType, amount, this, date);
    this._transactions.push(transaction);
  }

  printTransactionStatement(transaction: Transaction, balance: number): void {
    const dtf = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const date = transaction.getDate();
    const formattedDate = dtf.format(date);
    const credit =
      transaction.getType() === TRANSACTION_TYPE.CREDIT
        ? transaction.getAmount().toString()
        : "";
    const debit =
      transaction.getType() === TRANSACTION_TYPE.DEBIT
        ? transaction.getAmount().toString()
        : "";
    const statementBalance = balance.toFixed(2);

    console.log(
      `${formattedDate.padEnd(10)} || ${credit.padEnd(10)} || ${debit.padEnd(
        10
      )} || ${statementBalance.padEnd(10)}`
    );
  }

  printBankStatement(): void {
    this.printHeading();

    let balance = 0;

    for (const transaction of this._transactions) {
      balance = this.calcBalance(transaction, balance);
      this.printTransactionStatement(transaction, balance);
    }
  }

  printBankStatementBetween(startDate: Date, endDate: Date): void {
    this.printHeading();
    let balance = 0;

    for (const transaction of this._transactions) {
      const date = transaction.getDate();
      if (date >= startDate && date <= endDate) {
        balance = this.calcBalance(transaction, balance);
        this.printTransactionStatement(transaction, balance);
      }
    }
  }

  calcBalance(transaction: Transaction, balance: number): number {
    return transaction.getType() === TRANSACTION_TYPE.CREDIT
      ? balance + transaction.getAmount()
      : balance - transaction.getAmount();
  }

  printHeading() {
    console.log(
      `${"date".padEnd(10)} || ${"credit".padEnd(10)} || ${"debit".padEnd(
        10
      )} || ${"balance".padEnd(10)}`
    );
  }
}
