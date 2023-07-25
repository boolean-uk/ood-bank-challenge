"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.NormalAccount = void 0;
class NormalAccount {
    constructor() {
        this.balance = 0;
        this.transactions = [];
        this.debit = -500;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            let transaction = new Transaction(amount, true);
            this.transactions.push(transaction);
            console.log(this.transactions);
        }
    }
    withdraw(amount) {
        if (amount > 0) {
            if (this.balance - amount >= this.debit) {
                this.balance -= amount;
                let transaction = new Transaction(amount, false);
                this.transactions.push(transaction);
                console.log(this.transactions);
            }
        }
    }
}
exports.NormalAccount = NormalAccount;
class Transaction {
    constructor(amount, transactionType) {
        this.date = Date.now();
        this.amount = amount;
        this.transactionType = transactionType;
    }
}
exports.Transaction = Transaction;
