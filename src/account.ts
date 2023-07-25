import { Transaction } from "./Transaction";

export class Account {
  transactions: Transaction[];
  balance: number;
  accountNumber: number
  constructor() {
    this.balance = 0;
    this.transactions = [];
    this.accountNumber = this.generateAccountNumber();
  }

  generateAccountNumber(): number {
    return Math.floor(Math.random() * (999999999 - 100000000 + 1) + 100000000);
  }
}
