import { TRANSACTION_TYPE } from "../enums/TRANSACTION_TYPE";
import { BankStatement } from "./BankStatement";
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
    if (amount <= 500) {
      this._overdraftAmount = amount;
    }
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

  printBankStatement(): String {
    let bankStatement = BankStatement.generateBankStatement(this._transactions);
    console.log(bankStatement);
    return bankStatement;
  }
  printBankStatementBetween(startDate: Date, endDate: Date): String {
    let bankStatement = BankStatement.generateBankStatementBetweenDates(
      this._transactions,
      startDate,
      endDate
    );
    console.log(bankStatement);
    return bankStatement;
  }
}
