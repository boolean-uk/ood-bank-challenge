"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(_amount) {
        this._amount = _amount;
        this._type = true;
        this._date = new Date(Date.now());
        this._amount = _amount;
        if (this._amount < 0)
            this._type = false;
    }
    get date() {
        return this._date;
    }
    get amount() {
        return this._amount;
    }
    get type() {
        return this._type;
    }
}
exports.Transaction = Transaction;
