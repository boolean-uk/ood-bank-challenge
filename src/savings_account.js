"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingsAccount = void 0;
const account_1 = require("./account");
class SavingsAccount extends account_1.Account {
    deposit(amount) {
        let amountDepositedThisYear = this.transactions
            .filter(transaction => transaction.amount > 0)
            .filter(transaction => transaction.date.getFullYear() === new Date().getFullYear())
            .reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
        if (amount + amountDepositedThisYear > SavingsAccount.MAX_DEPOSIT_PER_YEAR)
            throw new Error(`${amount} + ${amountDepositedThisYear} exceeds the maximum allowed yearly deposit of ${SavingsAccount.MAX_DEPOSIT_PER_YEAR}`);
        super.deposit(amount);
    }
}
exports.SavingsAccount = SavingsAccount;
SavingsAccount.MAX_DEPOSIT_PER_YEAR = 20000;
