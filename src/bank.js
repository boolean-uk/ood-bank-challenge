"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.NormalAccount = void 0;
class NormalAccount {
    constructor() {
        this.balance = 0;
        this.transactions = [];
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
