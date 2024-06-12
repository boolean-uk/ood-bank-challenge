const Transaction = require('./Transaction');

class BankAccount {
    constructor() {
        this.transactions = [];
        this.overdraftLimit = 0;
    }

    deposit(amount, date) {
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive");
        }
        this.transactions.push(new Transaction(date, amount, "credit"));
    }

    withdraw(amount, date) {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive");
        }
        if (this.getBalance() + this.overdraftLimit < amount) {
            throw new Error("Insufficient funds");
        }
        this.transactions.push(new Transaction(date, amount, "debit"));
    }

    getBalance() {
        return this.transactions.reduce((balance, transaction) => {
            return transaction.transactionType === "credit" 
                ? balance + transaction.amount 
                : balance - transaction.amount;
        }, 0);
    }

    getStatement() {
        return this.transactions;
    }

    getStatementBetweenDates(startDate, endDate) {
        const start = new Date(startDate.split('/').reverse().join('-'));
        const end = new Date(endDate.split('/').reverse().join('-'));
        return this.transactions.filter(transaction => {
            const date = new Date(transaction.date.split('/').reverse().join('-'));
            return date >= start && date <= end;
        }).sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')));
    }

    setOverdraftLimit(limit) {
        this.overdraftLimit = limit;
    }
}

module.exports = BankAccount;
