"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
class Customer {
    constructor(_name, _account) {
        this._name = _name;
        this._account = _account;
        this._name = _name;
        this._account = _account;
    }
    get name() {
        return this._name;
    }
    get account() {
        return this._account;
    }
    addTransaction(transaction) {
        if (!transaction.type && transaction.amount * (-1) > this.account.balance)
            return;
        this.account.transactions.push(transaction);
    }
}
exports.Customer = Customer;
