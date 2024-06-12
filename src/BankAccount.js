import { Transaction } from './Transaction.js'
import {Statement} from './Statement.js'

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

    withdraw(amount, date) {
        const newBalance = this.calculateBalance() - amount
        const transaction = new Transaction(date, amount, 'debit', newBalance)
        this.#transactions.push(transaction)
    }

    printStatment() {
        const statement = new Statement(this.#transactions)
        const formattedStatement = statement.formatStatement()
        console.log(formattedStatement)
        return formattedStatement
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
