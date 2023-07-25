"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementFormatter = void 0;
class StatementFormatter {
    constructor(account) {
        this.account = account;
    }
    generateFormattedStatement() {
        let balance = 0;
        let statement = '';
        for (const transaction of this.account.transactions) {
            balance += transaction.amount;
            const newLine = transaction.dateToString() +
                ' || ' +
                (transaction.amount >= 0
                    ? transaction.amount + ' || || '
                    : '|| ' + Math.abs(transaction.amount) + ' || ') +
                balance;
            statement = newLine + '\n' + statement;
        }
        statement = 'date || credit || debit || balance\n' + statement;
        return statement.trim();
    }
}
exports.StatementFormatter = StatementFormatter;
