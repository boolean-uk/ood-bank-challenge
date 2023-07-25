import { Transaction } from './transaction'

export abstract class Account {
  transactions: Transaction[] = []

  deposit (amount: number): void {
    if (amount < 0) {
      throw new Error('Amount must be a positive number')
    }

    this.transactions.push(new Transaction(amount))
  }

  withdraw (amount: number): void {
    if (amount < 0) {
      throw new Error('Amount must be a positive number')
    }

    if (this.getBalance() < amount) {
      throw new Error('Amount must not exceed the balance')
    }

    this.transactions.push(new Transaction(amount * -1))
  }

  getBalance (): number {
    return this.transactions.reduce((accumulator, transaction) => accumulator + transaction.amount, 0)
  }
}
