"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const transaction_1 = require("./transaction");
class Account {
    constructor() {
        this.transactions = [];
    }
    deposit(amount) {
        if (amount < 0) {
            throw new Error('Amount must be a positive number');
        }
        this.transactions.push(new transaction_1.Transaction(amount));
    }
    withdraw(amount) {
        if (amount < 0) {
            throw new Error('Amount must be a positive number');
        }
        if (this.getBalance() < amount) {
            throw new Error('Amount must not exceed the balance');
        }
        this.transactions.push(new transaction_1.Transaction(amount * -1));
    }
    generateStatement() {
        let balance = 0;
        let statement = '';
        for (const transaction of this.transactions) {
            balance += transaction.amount;
            const newLine = transaction.date + ' || ' + (transaction.amount >= 0 ? transaction.amount + ' || || ' : '|| ' + Math.abs(transaction.amount) + ' || ') + balance;
            statement = newLine + '\n' + statement;
        }
        statement = 'date || credit || debit || balance\n' + statement;
        return statement.trim();
    }
    getBalance() {
        return this.transactions.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
    }
}
exports.Account = Account;
