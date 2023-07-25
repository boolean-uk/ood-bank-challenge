"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
var Account = /** @class */ (function () {
    function Account() {
        this.balanceHistory = [];
    }
    Account.prototype.getBalanceHistory = function () {
        return this.balanceHistory;
    };
    Account.prototype.balanceAfterEachTransaction = function (toIndex) {
        var total = 0;
        for (var i = 0; i <= toIndex; i++) {
            if (this.balanceHistory[i][1] === true) {
                total += this.balanceHistory[i][2];
            }
            else if (this.balanceHistory[i][1] === false) {
                total -= this.balanceHistory[i][2];
            }
        }
        return total;
    };
    Account.prototype.totalBalance = function () {
        return this.balanceAfterEachTransaction(this.balanceHistory.length);
    };
    Account.prototype.transaction = function (money, ifDeposit) {
        var date = new Date();
        var today = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
        this.balanceHistory.push([today, ifDeposit, money]);
        return this.balanceHistory;
    };
    return Account;
}());
exports.Account = Account;
