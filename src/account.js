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
        this.id++
        transaction.credit = cash
        this.credit += cash
        this.transactions.push(transaction)
        console.log(transaction)
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
        const calculate = this.credit - this.debit
        const balance = (Math.round(calculate * 100) / 100).toFixed(2)
        return balance
    }

    printBankStatement() {
        let transactions = this.transactions

        const debit = transactions.map((t) => {if(t.credit === undefined) return t})
        const credit = transactions.map((t) => {if(t.debit === undefined) return t})
        
    }
}

export { Account }

const accountInst = new Account('Frank', 'Reynolds')
accountInst.deposit(1.50)
accountInst.deposit(3.25)
accountInst.deposit(123.23)
accountInst.withdraw(0.57)
accountInst.getBalance()

accountInst.printBankStatement()









