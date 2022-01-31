const Transaction = require('./transaction.js')

class BankAccount {
    constructor() {
        this.transactionsList = []
        this.availableBalance = 0
    }
    
    deposit(date, amount) {
        this.availableBalance += amount
        const transaction = new Transaction(date, amount, this.availableBalance)
        this.transactionsList.push(transaction)
        return transaction
    }

    withdraw(date, amount) {
        if (this.availableBalance < amount) { return `You can only withdraw £${this.availableBalance}` }
        this.availableBalance -= amount
        const transaction = new Transaction(date, amount*-1, this.availableBalance)
        this.transactionsList.push(transaction)
        return transaction
    }

    getBalance() {
        return `Your current available balance is £${this.availableBalance}`
    }

    getTransactions() {
        return this.transactionsList
    }
}

module.exports = BankAccount
