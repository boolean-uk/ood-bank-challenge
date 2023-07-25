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
        }
    }
    withdraw(amount) {
        if (amount > 0) {
            if (this.balance - amount >= this.debit) {
                this.balance -= amount;
            }
        }
    }
}
exports.NormalAccount = NormalAccount;
class Transaction {
    constructor(date, amount) {
        this.date = date;
        this.amount = amount;
    }
}
exports.Transaction = Transaction;
