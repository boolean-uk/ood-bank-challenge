"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentAccount = void 0;
const account_1 = require("./account");
const transaction_1 = require("./transaction");
class CurrentAccount extends account_1.Account {
    constructor() {
        super(...arguments);
        this.overdraftAllowed = false;
    }
    withdraw(amount) {
        if (!this.overdraftAllowed) {
            super.withdraw(amount);
        }
        if (amount < 0) {
            throw new Error('Amount must be a positive number');
        }
        if (this.getBalance() + CurrentAccount.OVERDRAFT < amount) {
            throw new Error('Amount must not exceed overdraft');
        }
        this.transactions.push(new transaction_1.Transaction(amount * -1));
    }
    approveOverdraft() {
        this.overdraftAllowed = true;
    }
    rejectOverdraft() {
        this.overdraftAllowed = false;
    }
}
exports.CurrentAccount = CurrentAccount;
CurrentAccount.OVERDRAFT = 500;
