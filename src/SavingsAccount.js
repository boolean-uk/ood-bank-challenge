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
exports.SavingsAccount = void 0;
var BankAccount_1 = require("./BankAccount");
var Transaction_1 = require("./Transaction");
var SavingsAccount = /** @class */ (function (_super) {
    __extends(SavingsAccount, _super);
    function SavingsAccount() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultFee = 5;
        return _this;
    }
    SavingsAccount.prototype.withdraw = function (amount) {
        if (this.getBalance() < amount + this.defaultFee)
            return false;
        this.transactions.push(new Transaction_1.Transaction(-amount, this.defaultFee));
        return true;
    };
    SavingsAccount.prototype.addOverdraft = function (amount) {
        console.log("Cannot add overdraft to savings account");
        return false;
    };
    return SavingsAccount;
}(BankAccount_1.BankAccount));
exports.SavingsAccount = SavingsAccount;
