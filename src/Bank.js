"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = exports.TransactionType = void 0;
var TransactionType;
(function (TransactionType) {
    TransactionType["DEPOSIT"] = "DEPOSIT";
    TransactionType["WITHDRAWAL"] = "WITHDRAWAL";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
var Bank = /** @class */ (function () {
    function Bank() {
        this.transactions = [];
        this.balance = 0;
    }
    Bank.prototype.deposit = function (amount, date) {
        if (amount <= 0)
            return false;
        var transaction = {
            type: TransactionType.DEPOSIT,
            amount: amount,
            date: date,
        };
        this.balance += amount;
        this.transactions.push(transaction);
        return true;
    };
    Bank.prototype.withdraw = function (amount, date) {
        if (amount <= 0 || this.balance < amount)
            return false;
        var transaction = {
            type: TransactionType.WITHDRAWAL,
            amount: amount,
            date: date,
        };
        this.balance -= amount;
        this.transactions.push(transaction);
        return true;
    };
    Bank.prototype.showAccountHistory = function () {
        var result = "date        || credit    || debit     || balance\n";
        var balance = 0;
        for (var _i = 0, _a = this.transactions; _i < _a.length; _i++) {
            var transaction = _a[_i];
            var date_1 = transaction.date, amount = transaction.amount, type = transaction.type;
            var formattedDate = date_1.toLocaleDateString().padEnd(12);
            var formattedAmount = amount.toFixed(2).padStart(8);
            if (type === TransactionType.DEPOSIT) {
                balance += amount;
                result += "".concat(formattedDate, "|| ").concat(formattedAmount, "  ||           || ").concat(balance.toFixed(2), "\n");
            }
            else {
                balance -= amount;
                result += "".concat(formattedDate, "||           || ").concat(formattedAmount, "  || ").concat(balance.toFixed(2), "\n");
            }
        }
        return result;
    };
    return Bank;
}());
exports.Bank = Bank;
var bankAccount = new Bank();
var depositAmount = 1000;
var date = new Date('2023-07-24');
var result = bankAccount.deposit(depositAmount, date);
var accountHistory = bankAccount.showAccountHistory();
console.log(accountHistory);
