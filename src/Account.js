"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const js_joda_1 = require("js-joda");
class Account {
    constructor(accountNumber, password) {
        this.accountNumber = accountNumber;
        Account.balance = 0;
        this.password = password;
        Account.transactionHistory = [];
        Account.transactionDate = [];
        this.isOverdraft = false;
    }
    getTransactionHour(i) {
        const times = Account.transactionDate[i];
        return times.hour();
    }
    static Balance() {
        Account.balance = 0;
        for (const i of Account.transactionHistory) {
            Account.balance += i;
        }
        return Account.balance;
    }
    deposit(amount) {
        if (amount > 0) {
            Account.transactionHistory.push(amount);
            Account.transactionDate.push(js_joda_1.LocalDateTime.now());
            console.log(`Successfully deposited ${amount}$.`);
            return true;
        }
        console.log("You can't deposit a negative balance!");
        return false;
    }
    withdraw(amount) {
        Account.balance = Account.Balance();
        if (amount > 0) {
            if (Account.balance >= amount) {
                const negativeAmount = -amount;
                Account.transactionHistory.push(negativeAmount);
                Account.transactionDate.push(js_joda_1.LocalDateTime.now());
                console.log(`You have successfully withdrew ${amount}$.`);
                return true;
            }
            console.log(`You don't have enough balance to withdraw ${amount}$.`);
            return false;
        }
        console.log("You can't withdraw a negative balance.");
        return false;
    }
}
exports.Account = Account;
Account.balance = 0;
Account.transactionHistory = [];
Account.transactionDate = [];
