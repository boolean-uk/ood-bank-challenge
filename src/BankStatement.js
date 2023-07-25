"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankStatement = void 0;
const Account_1 = require("./Account");
const js_joda_1 = require("js-joda");
class BankStatement {
    static printStatement() {
        this.StatementPrint = [];
        this.StatementPrint.push("date       || credit || debit  || balance \n");
        console.log("------------------------------------------\n");
        let balance = 0;
        for (let i = 0; i < Account_1.Account.transactionHistory.length; i++) {
            const transactionAmount = Account_1.Account.transactionHistory[i];
            const transactionDate = Account_1.Account.transactionDate[i];
            if (transactionAmount > 0) {
                this.StatementPrint.push(`${transactionDate.format(js_joda_1.DateTimeFormatter.ofPattern("yyyy-MM-dd"))} || ${transactionAmount}   ||        || ${balance += transactionAmount}\n`);
            }
            else {
                this.StatementPrint.push(`${transactionDate.format(js_joda_1.DateTimeFormatter.ofPattern("yyyy-MM-dd"))} ||        ||  ${transactionAmount}  || ${balance += transactionAmount}\n`);
            }
        }
        this.StatementPrint.push("------------------------------------------\n");
        return this.StatementPrint.toString();
    }
}
exports.BankStatement = BankStatement;
BankStatement.StatementPrint = [];
