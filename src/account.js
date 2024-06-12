import Bank from "./bank.js"
import { Transaction } from "./transactions.js"

class Account extends Bank {
    // #credit
    // #debit
    // #transactions
    constructor(firstName, lastName) {
        super()
        this.firstName = firstName
        this.lastName = lastName
        this.credit = 0
        this.debit = 0
        this.transactions = []
        this.id = 1
    }

    deposit(date, cash) {
        const transaction = new Transaction(date, cash)
        transaction.id++
        this.credit += cash
        this.transactions.push(transaction)
        this.addAccountInfo(this)
    }

    withdraw(date, cash) {
        const transaction = new Transaction(date, cash)
        transaction.id++
        this.debit += cash
    }

    getBalance() {

    }
}

export { Account }

const accountInst = new Account('Frank', 'Reynolds')
accountInst.deposit('10/6/24', 1000)





