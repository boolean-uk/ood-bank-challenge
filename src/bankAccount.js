"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
class BankAccount {
    constructor(_number) {
        this._number = _number;
        this._transactions = [];
        this._number = _number;
        this._overdraftAmount = 0;
    }
    get overdraftAmount() {
        return this._overdraftAmount;
    }
    set overdraftAmount(value) {
        this._overdraftAmount = value;
    }
    get transactions() {
        return this._transactions;
    }
    get number() {
        return this._number;
    }
    get balance() {
        let balance = 0;
        for (let t of this.transactions)
            balance += t.amount;
        return balance;
    }
}
exports.BankAccount = BankAccount;
