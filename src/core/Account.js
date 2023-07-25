"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
var Transaction_1 = require("./Transaction");
var TRANSACTION_TYPE_1 = require("./enums/TRANSACTION_TYPE");
var Account = /** @class */ (function () {
    function Account(customer) {
        this._balance = 0;
        this._customer = customer;
        this._transactions = [];
    }
    Account.prototype.getBalance = function () {
        return this._balance;
    };
    Account.prototype.withdraw = function (amount) {
        if (this._balance >= amount) {
            this._balance -= amount;
        }
        else {
            throw new Error("Insufficient funds");
        }
    };
    Account.prototype.deposit = function (amount) {
        this._balance += amount;
    };
    Account.prototype.createTransaction = function (amount, transactionType, date) {
        var transaction = new Transaction_1.Transaction(transactionType, amount, this, date);
        this._transactions.push(transaction);
    };
    Account.prototype.printBankStatement = function () {
        console.log("".concat("date".padEnd(10), " || ").concat("credit".padEnd(10), " || ").concat("debit".padEnd(10), " || ").concat("balance".padEnd(10)));
        var dtf = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        var balance = 0;
        for (var _i = 0, _a = this._transactions; _i < _a.length; _i++) {
            var transaction = _a[_i];
            var date = dtf.format(transaction.getDate());
            var credit = transaction.getType() === TRANSACTION_TYPE_1.TRANSACTION_TYPE.CREDIT
                ? transaction.getAmount().toString()
                : "";
            var debit = transaction.getType() === TRANSACTION_TYPE_1.TRANSACTION_TYPE.DEBIT
                ? transaction.getAmount().toString()
                : "";
            balance = this.calcBalance(transaction, balance);
            var statementBalance = balance.toFixed(2);
            console.log("".concat(date.padEnd(10), " || ").concat(credit.padEnd(10), " || ").concat(debit.padEnd(10), " || ").concat(statementBalance.padEnd(10)));
        }
    };
    Account.prototype.calcBalance = function (transaction, currentBalance) {
        return transaction.getType() === TRANSACTION_TYPE_1.TRANSACTION_TYPE.CREDIT
            ? currentBalance + transaction.getAmount()
            : currentBalance - transaction.getAmount();
    };
    return Account;
}());
exports.Account = Account;
