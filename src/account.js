import Bank from "./bank.js"
import { Transaction } from "./transactions.js"

class Account extends Bank {

    constructor(firstName, lastName) {
        super()
        this.firstName = firstName
        this.lastName = lastName
        this.credit = 0
        this.debit = 0
        this.transactions = []
        this.id = 1
    }

    deposit(cash) {
        const transaction = new Transaction(this.id)
        transaction.credit = cash
        this.id++
        this.credit += cash
        this.transactions.push(transaction)
        this.accountTransactions(this)
    }

    withdraw(cash) {
        const transaction = new Transaction(this.id)
        transaction.debit = cash
        this.id++
        this.debit += cash
        this.transactions.push(transaction)
        this.accountTransactions(this)
    }

    getBalance() {
        const balance = this.credit - this.debit
        return balance
    }

    printBankStatement() {
        this.transactions.map((t) => console.log(t))
    }
}

export { Account }

const accountInst = new Account('Frank', 'Reynolds')
accountInst.deposit(1000)
accountInst.withdraw(20)
accountInst.printBankStatement()







