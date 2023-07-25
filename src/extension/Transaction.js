"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
var Transaction = /** @class */ (function () {
    function Transaction(type, amount, account, date) {
        this.type = type;
        this.amount = amount;
        this.account = account;
        this.date = date;
    }
    Transaction.prototype.getType = function () {
        return this.type;
    };
    Transaction.prototype.getAmount = function () {
        return this.amount;
    };
    Transaction.prototype.getDate = function () {
        return this.date;
    };
    return Transaction;
}());
exports.Transaction = Transaction;
