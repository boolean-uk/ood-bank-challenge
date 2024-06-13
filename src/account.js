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

    createTransaction(date) {
        if(date === undefined || date.length < 8 || date.length > 8) {
            throw 'Invalid date, must be dd/mm/yy'
        }
        const transaction = new Transaction(this.id, date)
        this.id++
        this.transactions.push(transaction)
        return transaction
    }

    deposit(cash, date) {
        const deposit = this.createTransaction(date)
        deposit.credit = cash
        this.credit += cash
        this.accountTransactions(this)
    }

    withdraw(cash, date) {
        const withdraw = this.createTransaction(date)
        withdraw.debit = cash
        this.debit += cash
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
        const balance = this.round(calculate)
        return balance
    }

    checkTransaction(transaction) {
        if(transaction === undefined) {
                return '      '
            }
        const cash = this.round(transaction)
        return `£${cash}`
    }

    round(number) {
        return ((Math.round(number * 100) / 100).toFixed(2))
    }

    printBankStatement() {
        let transactions = this.transactions

        for(let i = 0; i < transactions.length; i++) {
            const statement = 
        `date     || credit || debit || balance
${transactions[i].date} || ${this.checkTransaction(transactions[i].credit)} || ${this.checkTransaction(transactions[i].debit)} || £${this.getBalance(transactions[i].credit, transactions[i].debit)}`
   
        }
        
    }
}

export { Account }

const accountInst = new Account('Frank', 'Reynolds')
accountInst.deposit(1.50, '10/08/24')
accountInst.deposit(3.25, '11/08/24')
accountInst.deposit(123.23, '13/10/24')
accountInst.withdraw(0.57, '14/09/24')
accountInst.deposit(3.00, '15/10/24')
accountInst.withdraw(4.00, '16/10/24')


accountInst.printBankStatement()









