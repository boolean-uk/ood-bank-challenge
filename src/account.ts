import { Transaction } from './transaction'

export abstract class Account {
  transactions: Transaction[] = []

  deposit (amount: number) {
    if (amount < 0) {
      throw new Error('Amount must be a positive number')
    }

    this.transactions.push(new Transaction(amount))
  }

  getBalance (): number {
    return this.transactions.reduce((accumulator, transaction) => accumulator + transaction.amount, 0)
  }
}
