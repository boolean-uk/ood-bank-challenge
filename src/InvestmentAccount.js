"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentAccount = void 0;
const Account_1 = require("./Account");
class InvestmentAccount extends Account_1.Account {
    constructor(accountNumber, password) {
        super(accountNumber, password);
    }
}
exports.InvestmentAccount = InvestmentAccount;
