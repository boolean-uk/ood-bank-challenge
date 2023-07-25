"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankStatement = void 0;
var TRANSACTION_TYPE_1 = require("../enums/TRANSACTION_TYPE");
var BankStatement = /** @class */ (function () {
    function BankStatement() {
    }
    BankStatement.generateBankStatement = function (transactions) {
        var statement = "";
        statement += this.printHeading();
        var balance = 0;
        for (var _i = 0, transactions_1 = transactions; _i < transactions_1.length; _i++) {
            var transaction = transactions_1[_i];
            balance = this.calcBalance(transaction, balance);
            statement += this.printTransactionStatement(transaction, balance);
        }
        return statement;
    };
    BankStatement.printTransactionStatement = function (transaction, balance) {
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
        return "".concat(formattedDate.padEnd(10), " || ").concat(credit.padEnd(10), " || ").concat(debit.padEnd(10), " || ").concat(statementBalance.padEnd(10), "\n");
    };
    BankStatement.generateBankStatementBetweenDates = function (transactions, startDate, endDate) {
        var filteredTransctions = transactions.filter(function (transaction) {
            return transaction.getDate() >= startDate && transaction.getDate() <= endDate;
        });
        return this.generateBankStatement(filteredTransctions);
    };
    BankStatement.calcBalance = function (transaction, balance) {
        return transaction.getType() === TRANSACTION_TYPE_1.TRANSACTION_TYPE.CREDIT
            ? balance + transaction.getAmount()
            : balance - transaction.getAmount();
    };
    BankStatement.printHeading = function () {
        return "".concat("date".padEnd(10), " || ").concat("credit".padEnd(10), " || ").concat("debit".padEnd(10), " || ").concat("balance".padEnd(10), "\n");
    };
    return BankStatement;
}());
exports.BankStatement = BankStatement;
