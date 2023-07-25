import { Transaction, TransactionType } from "./Transaction";

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

  depositFunds(amount: number): void{
    this.balance += amount;
    const transaction: Transaction = new Transaction(TransactionType.Credit, amount, this.balance, new Date().toLocaleDateString());
    this.transactions.push(transaction);
  }

  withdrawFunds(amount: number): void{
    if(amount > this.balance){
        throw new Error("You don't have enough money to make this withdrawal");
    }
    this.balance -= amount;
    const transaction: Transaction = new Transaction(TransactionType.Credit, amount, this.balance, new Date().toLocaleDateString());
    this.transactions.push(transaction);
  }

  getBalance(): number{
    return this.balance;
  }

  getTransactions(): Transaction[]{
    return this.transactions;
  }
}
