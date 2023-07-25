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

  depositFunds(amount: number, date: Date): void{
    this.balance += amount;
    const transaction: Transaction = new Transaction(TransactionType.Credit, amount, this.balance, date.toLocaleDateString());
    this.transactions.push(transaction);
  }

  withdrawFunds(amount: number, date: Date): void{
    if(amount > this.balance){
        throw new Error("You don't have enough money to make this withdrawal");
    }
    this.balance -= amount;
    const transaction: Transaction = new Transaction(TransactionType.Debit, amount, this.balance, date.toLocaleDateString());
    this.transactions.push(transaction);
  }

  getBalance(): number{
    return this.balance;
  }

  getTransactions(): Transaction[]{
    return this.transactions;
  }

  getAccountStatement(): string{
    let statement = "date      || credit || debit   || balance\n"; 
    this.transactions.sort((a, b) => a.date.localeCompare(b.date));
    this.transactions.forEach(element => {
        statement += element.getTransactionDescription();
        statement += "\n";
    });

    return statement;
  }

}
