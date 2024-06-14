import { Transaction } from './Transaction.js'
import { Statement } from './Statement.js'

class BankAccount {
    #transactions
    #overdraft
    #type
    #yearlyDeposit

    static SAVINGS_DEPOSIT_LIMIT = 200000

    constructor(type = 'Checking') {
        this.#transactions = []
        this.#overdraft = type === 'Checking' ? 50000 : 0 // 500 pound overdraft in pence
        this.#type = type
        this.#yearlyDeposit = 0
    }

    deposit(amount, date) {
        if (this.#type === 'Savings' && (this.#yearlyDeposit + amount)> BankAccount.SAVINGS_DEPOSIT_LIMIT) {
            throw new Error('Deposit limit exceeded for Savings account')
        }
        this.#yearlyDeposit += amount
        const newBalance = this.calculateBalance() + amount
        const transaction = new Transaction(date, amount, 'credit', newBalance)
        this.#transactions.push(transaction)
    }

    withdraw(amount, date) {
        if (this.calculateAvailableFunds() < amount) {
            throw new Error('Insufficient Funds')
        }
        const newBalance = this.calculateBalance() - amount
        const transaction = new Transaction(date, amount, 'debit', newBalance)
        this.#transactions.push(transaction)
    }
    
    printStatement() {
        const statement = new Statement(this.#transactions)
        const formattedStatement = statement.formatStatement()
        console.log(formattedStatement)
        return formattedStatement
    }

    generateStatement(startDate, endDate) {
        const filteredTransactions = this.#transactions.filter(transaction => {
            const transactionDate = new Date(transaction.getDetails().date)
            const start = new Date(startDate)
            const end = new Date(endDate)
            
            return transactionDate >= start && transactionDate <= end
        })
        
        const statement = new Statement(filteredTransactions)
        return statement.formatStatement()
    }

    calculateBalance() {
        return this.#transactions.reduce((balance, transaction) => {
            return transaction.getDetails().type === 'credit' ? balance + transaction.getDetails().amount : balance - transaction.getDetails().amount
        }, 0)
    }

    calculateAvailableFunds() {
        return this.calculateBalance() + this.#overdraft
    }

    getTransactions() {
        return this.#transactions
    }

    accumulateInterest() {
        if (this.#type === 'Investment') {
            const interest = this.calculateBalance() * 0.02
            this.deposit(interest, new Date().toISOString().split('T')[0])
        }
    }
}

export { BankAccount }
