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
        // Get the balance from the base class (Account)
        let baseBalance = super.getBalance();
        console.log(`base balance: ${baseBalance}`);
        console.log();
        let monthsSinceCreationDate = this.monthDifference(this.creationDate, now);
        console.log(`months since:  ${monthsSinceCreationDate}`);
        console.log(`creation date: ${this.creationDate}`);
        // Calculate the interest accumulated for each full month
        let interest = baseBalance * InvestmentAccount.INTEREST_PER_MONTH * monthsSinceCreationDate;
        console.log(`interest: ${interest}`);
        // Add the interest to the base balance
        return baseBalance + interest;
    }
    monthDifference(dateFrom, dateTo) {
        return dateTo.getMonth() - dateFrom.getMonth() +
            (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
    }
}
exports.InvestmentAccount = InvestmentAccount;
InvestmentAccount.INTEREST_PER_MONTH = 0.02;
