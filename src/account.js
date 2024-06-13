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

    getBalance(credit, debit) {
        if(credit === undefined) {
            credit = 0
        }
        if(debit === undefined) {
            debit = 0
        }
        const calculate = credit - debit
        const balance = (Math.round(calculate * 100) / 100).toFixed(2)
        return balance
    }

    checkTransaction(transaction) {
        if(transaction === undefined) {
                return '      '
            }
        const cash = ((Math.round(transaction * 100) / 100).toFixed(2))
        return `£${cash}`
    }

    printBankStatement() {
        let transactions = this.transactions
        const date = transactions.map((t) => t.date)
        const credit = transactions.map((t) => t.credit)
        const debit = transactions.map((t) => t.debit)

        for(let i = 0; i < transactions.length; i++) {

            const statement = 
        `date     || credit || debit || balance
${transactions[i].date} || ${this.checkTransaction(transactions[i].credit)} || ${this.checkTransaction(transactions[i].debit)}  || £${this.getBalance(transactions[i].credit, transactions[i].debit)}`
            console.log(statement)
        }
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









