"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = void 0;
var Account_1 = require("./Account");
var Bank = /** @class */ (function (_super) {
    __extends(Bank, _super);
    function Bank() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bank.prototype.transactionType = function (transactionType) {
        if (transactionType === true) {
            return '    Deposit     ';
        }
        else if (transactionType === false) {
            return '   Withdrawal   ';
        }
    };
    Bank.prototype.printStatement = function () {
        console.log('   Date   || Transaction type || Amount || Total balance');
        var balanceHistory = this.getBalanceHistory();
        for (var i = 0; i < balanceHistory.length; i++) {
            console.log(balanceHistory[i][0] + " || " + this.transactionType(balanceHistory[i][1]) + " || £ " + balanceHistory[i][2] + " ||    £ " + this.balanceAfterEachTransaction(i));
        }
    };
    return Bank;
}(Account_1.Account));
exports.Bank = Bank;
