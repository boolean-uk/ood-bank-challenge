"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
var TRANSACTION_TYPE_1 = require("../enums/TRANSACTION_TYPE");
var Transaction_1 = require("./Transaction");
var Account = /** @class */ (function () {
    function Account(customer) {
        this._customer = customer;
        this._transactions = [];
    }
    Account.prototype.withdraw = function (amount) {
        if (this.getBalance() >= amount) {
            this.createTransaction(amount, TRANSACTION_TYPE_1.TRANSACTION_TYPE.DEBIT, new Date());
        }
        else {
            throw new Error("Insufficient funds");
        }
    };
    Account.prototype.deposit = function (amount) {
        this.createTransaction(amount, TRANSACTION_TYPE_1.TRANSACTION_TYPE.CREDIT, new Date());
    };
    Account.prototype.getBalance = function () {
        var balance = 0;
        for (var _i = 0, _a = this._transactions; _i < _a.length; _i++) {
            var transaction = _a[_i];
            if (transaction.getType() === TRANSACTION_TYPE_1.TRANSACTION_TYPE.CREDIT) {
                balance = balance + transaction.getAmount();
            }
            if (transaction.getType() === TRANSACTION_TYPE_1.TRANSACTION_TYPE.DEBIT) {
                balance = balance - transaction.getAmount();
            }
        }
        return balance;
    };
    Account.prototype.createTransaction = function (amount, transactionType, date) {
        var transaction = new Transaction_1.Transaction(transactionType, amount, this, date);
        this._transactions.push(transaction);
    };
    Account.prototype.printTransactionStatement = function (transaction, balance) {
        var dtf = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        var date = transaction.getDate();
        var formattedDate = dtf.format(date);
        var credit = transaction.getType() === TRANSACTION_TYPE_1.TRANSACTION_TYPE.CREDIT
            ? transaction.getAmount().toString()
            : "";
        var debit = transaction.getType() === TRANSACTION_TYPE_1.TRANSACTION_TYPE.DEBIT
            ? transaction.getAmount().toString()
            : "";
        var statementBalance = balance.toFixed(2);
        console.log("".concat(formattedDate.padEnd(10), " || ").concat(credit.padEnd(10), " || ").concat(debit.padEnd(10), " || ").concat(statementBalance.padEnd(10)));
    };
    Account.prototype.printBankStatement = function () {
        this.printHeading();
        var balance = 0;
        for (var _i = 0, _a = this._transactions; _i < _a.length; _i++) {
            var transaction = _a[_i];
            balance = this.calcBalance(transaction, balance);
            this.printTransactionStatement(transaction, balance);
        }
    };
    Account.prototype.printBankStatementBetween = function (startDate, endDate) {
        this.printHeading();
        var balance = 0;
        for (var _i = 0, _a = this._transactions; _i < _a.length; _i++) {
            var transaction = _a[_i];
            var date = transaction.getDate();
            if (date >= startDate && date <= endDate) {
                balance = this.calcBalance(transaction, balance);
                this.printTransactionStatement(transaction, balance);
            }
        }
    };
    Account.prototype.calcBalance = function (transaction, balance) {
        return transaction.getType() === TRANSACTION_TYPE_1.TRANSACTION_TYPE.CREDIT
            ? balance + transaction.getAmount()
            : balance - transaction.getAmount();
    };
    Account.prototype.printHeading = function () {
        console.log("".concat("date".padEnd(10), " || ").concat("credit".padEnd(10), " || ").concat("debit".padEnd(10), " || ").concat("balance".padEnd(10)));
    };
    return Account;
}());
exports.Account = Account;
