"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentAccount = void 0;
const account_1 = require("./account");
class InvestmentAccount extends account_1.Account {
    // for testing purposes only
    constructor(creationDate = new Date()) {
        super();
        this.creationDate = creationDate;
    }
    getBalance(now = new Date()) {
        let baseBalance = super.getBalance();
        let monthsSinceCreationDate = this.monthDifference(this.creationDate, now);
        let interest = baseBalance * InvestmentAccount.INTEREST_PER_MONTH * monthsSinceCreationDate;
        return baseBalance + interest;
    }
    monthDifference(dateFrom, dateTo) {
        return dateTo.getMonth() - dateFrom.getMonth() +
            (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
    }
}
exports.InvestmentAccount = InvestmentAccount;
InvestmentAccount.INTEREST_PER_MONTH = 0.02;
