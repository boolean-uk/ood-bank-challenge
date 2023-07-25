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
    getBalance() {
        return this.transactions.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
    }
}
exports.Account = Account;
