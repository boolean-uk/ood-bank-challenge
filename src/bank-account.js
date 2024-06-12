import { Transaction } from "./transaction.js"

class BankAccount {
  constructor() {
    this.transaction = []
    this.balance = 0
  }

  deposit(amount, date, type) {
    this.balance += amount
    this.transaction = new Transaction(amount, date, type, this.balance)
  }

  get getTransactions() {
    return this.transaction
  }

  get getBalance() {
    return this.balance
  }
  
}


export { BankAccount }