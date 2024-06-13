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

    deposit(cash, date) {
        if(date.length < 8 || date.length > 8) {
            throw 'Invalid date, must be dd/mm/yy'
        }
        const transaction = new Transaction(this.id, date)
        this.id++
        transaction.credit = cash
        this.credit += cash
        this.transactions.push(transaction)
        this.accountTransactions(this)
    }

    withdraw(cash, date) {
        if(date.length < 8 || date.length > 8) {
            throw 'Invalid date, must be dd/mm/yy'
        }
        const transaction = new Transaction(this.id, date)
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

    checkTransaction(transaction) {
        if(transaction === undefined) {
                return ' '
            }
        return transaction
    }

    printBankStatement() {
        let transactions = this.transactions
        // const debit = transactions.map((t) => {if(t.credit === undefined) return t.debit})
        // const credit = transactions.map((t) => {if(t.debit === undefined) return t.credit})
        // const date = transactions.map((t) => t.date)

        let date = undefined
        let credit = undefined
        let debit = undefined
        for(let i = 0; i < transactions.length; i++) {
            date = transactions[i].date
            credit = transactions[i].credit
            debit = transactions[i].debit

        }

        const statement = 
        `date   ||   credit  ||  debit  || balance
        ${date} || ${this.checkTransaction(credit)}  || ${this.checkTransaction(debit)} || ${this.getBalance()}`
        console.log(statement)
    }
}

export { Account }

const accountInst = new Account('Frank', 'Reynolds')
accountInst.deposit(1.50, '10/08/24')
accountInst.deposit(3.25, '11/08/24')
accountInst.deposit(123.23, '13/10/24')
accountInst.withdraw(0.57, '14/09/24')

accountInst.checkTransaction()

accountInst.printBankStatement()









