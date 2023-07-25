"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
class BankAccount {
    constructor(_number) {
        this._number = _number;
        this._transactions = [];
        this._number = _number;
        this._balance = 0;
    }
    get transactions() {
        return this._transactions;
    }
    get number() {
        return this._number;
    }
    get balance() {
        return this._balance;
    }
    set balance(value) {
        this._balance = value;
    }
}
exports.BankAccount = BankAccount;
