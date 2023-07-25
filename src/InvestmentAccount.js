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
exports.InvestmentAccount = void 0;
var BankAccount_1 = require("./BankAccount");
var InvestmentAccount = /** @class */ (function (_super) {
    __extends(InvestmentAccount, _super);
    function InvestmentAccount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InvestmentAccount.prototype.addOverdraft = function (amount) {
        console.log("Cannot add overdraft to investment account");
        return false;
    };
    return InvestmentAccount;
}(BankAccount_1.BankAccount));
exports.InvestmentAccount = InvestmentAccount;
