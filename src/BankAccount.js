"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
var StatementGenerator_1 = require("./StatementGenerator");
var Transaction_1 = require("./Transaction");
var BankAccount = /** @class */ (function () {
    function BankAccount() {
        this.transactions = [];
    }
    BankAccount.prototype.getBalance = function () {
        var balance = 0;
        for (var i = 0; i < this.transactions.length; ++i) {
            var transaction = this.transactions[i];
            balance += transaction.getAmount() - transaction.getFee();
        }
        return balance;
    };
    BankAccount.prototype.getTransactions = function () {
        return this.transactions;
    };
    // includes extension 2.
    BankAccount.prototype.withdraw = function (amount, date) {
        if (date === void 0) { date = new Date(); }
        if (this.getBalance() < amount)
            return false;
        this.transactions.push(new Transaction_1.Transaction(-amount, 0, date));
        return true;
    };
    BankAccount.prototype.deposit = function (amount, date) {
        if (date === void 0) { date = new Date(); }
        this.transactions.push(new Transaction_1.Transaction(amount, 0, date));
    };
    BankAccount.prototype.addOverdraft = function (amount) {
        console.log("Cannot add overdraft");
        return false;
    };
    BankAccount.prototype.generateStatement = function () {
        return StatementGenerator_1.StatementGenerator.generateStatement(this.transactions);
    };
    // extension no. 1
    BankAccount.prototype.generateStatementBetweenDates = function (dateFrom, dateTo) {
        if (dateTo === void 0) { dateTo = new Date(); }
        return StatementGenerator_1.StatementGenerator.generateStatementBetweenDates(this.transactions, dateFrom, dateTo);
    };
    return BankAccount;
}());
exports.BankAccount = BankAccount;
