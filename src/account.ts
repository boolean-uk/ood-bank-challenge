import { Transaction } from "./Transaction";

export class Account {
  transactions: Transaction[];
  balance: number
  constructor(private accountNumber: string) {
    this.balance = 0;
    this.transactions = [];
  }
}
