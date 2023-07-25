"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(_amount) {
        this._amount = _amount;
        this._date = new Date();
    }
    get amount() {
        return this._amount;
    }
    get date() {
        return this._date.getDate() + '/' + (this._date.getMonth() + 1) + '/' + this._date.getFullYear();
    }
}
exports.Transaction = Transaction;
