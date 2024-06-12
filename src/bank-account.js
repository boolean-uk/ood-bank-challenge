import { Transaction } from "./transaction.js"

class BankAccount {
  constructor() {
    this.transaction = []
    this.balance = 0
  }

  deposit(amount, date, type) {
    this.balance += amount
    this.transaction.push(new Transaction(amount, date, type, this.balance))
  }

  withdraw(amount, date, type) {
    if((this.balance - amount) < 0) {
      return 'You dont have enough money!'
    }
    
    this.balance -= amount
    this.transaction.push(new Transaction(amount, date, type, this.balance))
  }

  get getTransactions() {
    return this.transaction
  }

  get getBalance() {
    return this.balance
  }
}


export { BankAccount }