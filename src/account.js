"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const transaction_1 = require("./transaction");
const StatementFormatter_1 = require("./StatementFormatter");
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
        const statementFormatter = new StatementFormatter_1.StatementFormatter(this);
        return statementFormatter.generateFormattedStatement();
    }
    getBalance(now = new Date()) {
        return this.transactions.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
    }
}
exports.Account = Account;
