"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
var Transaction = /** @class */ (function () {
    function Transaction(amount, fee, date) {
        if (fee === void 0) { fee = 0; }
        if (date === void 0) { date = new Date(); }
        this.date = date;
        this.amount = amount;
        this.fee = fee;
    }
    Transaction.prototype.getDate = function () { return this.date; };
    Transaction.prototype.getAmount = function () { return this.amount; };
    Transaction.prototype.getFee = function () { return this.fee; };
    return Transaction;
}());
exports.Transaction = Transaction;
