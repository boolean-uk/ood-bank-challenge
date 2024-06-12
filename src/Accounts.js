import numeral from "numeral"
import { Credit, Debit } from './Transactions.js'

class Account {
    #transactions

    constructor(transactions = []) {
        this.#transactions = transactions
    }

    credit(amount) {
        const newTransaction = new Credit(amount, this.getDate())
        this.#transactions.push(newTransaction)
    }

    debit(amount) {
        const newTransaction = new Debit(amount, this.getDate())
        this.#transactions.push(newTransaction)
    }

    getDate() {
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getYear()
        return `${day} / ${month} / ${year}`
    }

    get transactions() {
        return [...this.#transactions]
    } 

    get balance() {
        
    }

    get credits() {
        const filteredTransactions = this.#transactions.filter((transaction) => transaction.constructor.name === 'Credit')
        return [ ...filteredTransactions ]
    }

    get debits() {
        const filteredTransactions = this.#transactions.filter((transaction) => transaction.constructor.name === 'Debit')
        return [ ...filteredTransactions ]
    }
}



export { Account }