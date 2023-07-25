import { Transaction } from './transaction'

export abstract class Account {
  transactions: Transaction[] = []

  deposit(amount: number): void {
    if (amount < 0) {
      throw new Error('Amount must be a positive number')
    }

    this.transactions.push(new Transaction(amount))
  }

  withdraw(amount: number): void {
    if (amount < 0) {
      throw new Error('Amount must be a positive number')
    }

    if (this.getBalance() < amount) {
      throw new Error('Amount must not exceed the balance')
    }

    this.transactions.push(new Transaction(amount * -1))
  }

  generateStatement(): string {
    let balance = 0
    let statement = ''
    for (const transaction of this.transactions) {
      balance += transaction.amount
      const newLine = transaction.dateToString() + ' || ' + (transaction.amount >= 0 ? transaction.amount + ' || || ' : '|| ' + Math.abs(transaction.amount) + ' || ') + balance
      statement = newLine + '\n' + statement
    }

    statement = 'date || credit || debit || balance\n' + statement
    return statement.trim()
  }

  getBalance(now: Date = new Date()): number {
    return this.transactions.reduce((accumulator, transaction) => accumulator + transaction.amount, 0)
  }
}
