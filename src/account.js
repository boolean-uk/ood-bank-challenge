import Bank from "./bank.js"
import { Transaction } from "./transactions.js"

class Account extends Bank {
    #transactions
    constructor(firstName, lastName) {
        super()
        this.firstName = firstName
        this.lastName = lastName
        this.#transactions = []
        this.id = 1
    }

    createTransaction(date) {
        if(!typeof date === 'string' || date === undefined || date.length < 8 || date.length > 8) {
            throw 'Invalid date, must be dd/mm/yy'
        }
        const transaction = new Transaction(this.id, date)
        this.id++
        this.#transactions.push(transaction)
        return transaction
    }

    deposit(cash, date) {
        if(!typeof cash === 'number') {
            throw 'Invalid input please provide a number value'
        }
        const deposit = this.createTransaction(date)
        deposit.credit = this.round(cash)
        this.accountTransactions(this)
    }

    withdraw(cash, date) {
        if(!typeof cash === 'number') {
            throw 'Invalid input please provide a number value'
        }
        const withdraw = this.createTransaction(date)
        withdraw.debit = this.round(cash)
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

    isDefined(transaction) {
        if(transaction === undefined) {
            return '     '
        }
        return `£${transaction}`
    }

    round(number) {
        return ((Math.round(number * 100) / 100).toFixed(2))
    }

    get transactions() {
        return [...this.#transactions]
    }

    printBankStatement() {
        let transactions = this.#transactions
        console.log('date     ||  credit     ||  debit    ||    balance')
        for(let i = 0; i < transactions.length; i++) {
console.log(`${transactions[i].date} ||       ${this.isDefined(transactions[i].credit)} ||     ${this.isDefined(transactions[i].debit)} ||     £${this.getBalance(transactions[i].credit, transactions[i].debit)}`)
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
accountInst.getBalance()

accountInst.printBankStatement()









