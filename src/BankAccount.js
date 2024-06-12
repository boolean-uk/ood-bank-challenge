import { Transaction } from './Transaction.js'

class BankAccount {
    #transactions

    constructor() {
        this.#transactions = []
    }

    deposit(amount, date) {
        const newBalance = this.calculateBalance() + amount
        const transaction = new Transaction(date, amount, 'credit', newBalance)
        this.#transactions.push(transaction)
    }

    calculateBalance() {
        return this.#transactions.reduce((balance, transaction) => {
            const { amount, type } = transaction.getDetails()
            return type === 'credit' ? balance + amount : balance - amount
        }, 0)
    }

    getTransactions() {
        return this.#transactions.map(transaction => transaction.getDetails())
    }
}

export { BankAccount }
