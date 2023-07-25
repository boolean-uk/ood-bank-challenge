"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckingAccount = void 0;
const Account_1 = require("./Account");
const js_joda_1 = require("js-joda");
class CheckingAccount extends Account_1.Account {
    constructor(accountNumber, password) {
        super(accountNumber, password);
        this.OverdraftLimit = 500;
    }
    Overdraft(request) {
        this.isOverdraft = request;
        return this.isOverdraft;
    }
    withdraw(amount) {
        Account_1.Account.balance = Account_1.Account.Balance();
        if (amount > 0) {
            if (Account_1.Account.balance >= amount) {
                const negativeAmount = -amount;
                Account_1.Account.transactionHistory.push(negativeAmount);
                Account_1.Account.transactionDate.push(js_joda_1.LocalDateTime.now());
                console.log(`You have successfully withdrew ${amount}$.`);
                return true;
            }
            else if (this.isOverdraft) {
                if (-(Account_1.Account.balance - amount) <= this.OverdraftLimit) {
                    const negativeAmount = -amount;
                    Account_1.Account.transactionHistory.push(negativeAmount);
                    Account_1.Account.transactionDate.push(js_joda_1.LocalDateTime.now());
                    console.log(`You have successfully withdrew ${amount}$.`);
                    return true;
                }
                console.log(`You don't have enough balance to withdraw ${amount}$.`);
                return false;
            }
            console.log(`You don't have enough balance to withdraw ${amount}$.`);
            return false;
        }
        console.log("You can't withdraw a negative balance.");
        return false;
    }
}
exports.CheckingAccount = CheckingAccount;
