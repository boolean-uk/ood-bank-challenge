"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(_amount) {
        this._amount = _amount;
        this.date = new Date();
    }
    get amount() {
        return this._amount;
    }
}
exports.Transaction = Transaction;
