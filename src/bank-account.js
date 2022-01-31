const Transaction = require('./transaction.js')

class BankAccount {
    constructor() {
        this.transactionsList = []
        this.availableBalance = 0
    }
    
    deposit(date, amount) {
        const transaction = new Transaction(date, amount)
        this.availableBalance += amount
        this.transactionsList.push(transaction)
        return transaction
    }

    withdraw(date, amount) {
        const transaction = new Transaction(date, amount*-1)
        this.availableBalance -= amount
        this.transactionsList.push(transaction)
        return transaction
    }

    getBalance() {
        return `Your available balance is £${this.availableBalance}`
    }
}

module.exports = BankAccount