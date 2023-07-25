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
exports.CheckingAccount = void 0;
var BankAccount_1 = require("./BankAccount");
var CheckingAccount = /** @class */ (function (_super) {
    __extends(CheckingAccount, _super);
    function CheckingAccount() {
        var _this = _super.call(this) || this;
        _this.maxOverdraft = 500;
        _this.overdraft = 0;
        return _this;
    }
    CheckingAccount.prototype.addOverdraft = function (amount) {
        if (amount < 0 || this.overdraft + amount > this.maxOverdraft)
            return false;
        this.overdraft += amount;
        return true;
    };
    CheckingAccount.prototype.getOverdraft = function () {
        return this.overdraft;
    };
    return CheckingAccount;
}(BankAccount_1.BankAccount));
exports.CheckingAccount = CheckingAccount;
