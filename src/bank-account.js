import { DateProvider } from "./date.js"
import { Transaction } from "./transaction.js"
class BankAccount {
  constructor() {
    this.transaction = []
    this.balance = 0
    this.date = new DateProvider
  }

  
  deposit(amount) {
    const date = this.date.currentDate()
    this.balance += amount
    this.transaction.push(new Transaction(amount, date, 'credit', this.balance))
  }

  withdraw(amount) {
    if((this.balance - amount) < 0) {
      return 'You dont have enough money!'
    }
    const date = this.date.currentDate()
    this.balance -= amount
    this.transaction.push(new Transaction(amount, date, 'debit', this.balance))
  }

  get getTransactions() {
    return this.transaction
  }

  get getBalance() {
    return this.balance
  }
}


export { BankAccount }