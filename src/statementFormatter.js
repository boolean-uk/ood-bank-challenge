"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementFormatter = void 0;
class StatementFormatter {
    constructor(_customer) {
        this._customer = _customer;
        this._customer = _customer;
    }
    get customer() {
        return this._customer;
    }
    generateStatement() {
        let statement = 'date       || credit || debit  || balance\n';
        let transactions = this.customer.account.transactions;
        let sum = 0.00;
        for (let transaction of transactions) {
            let date = transaction.date;
            const month = (date.getMonth() + 1).toLocaleString('en-EU', { minimumIntegerDigits: 2 });
            let formatDate = date.getDate() + '/' + month + '/' + date.getFullYear();
            sum += parseFloat(transaction.amount.toFixed(2));
            if (transaction.type)
                statement += formatDate + ' || ' + transaction.amount.toFixed(2) + ' || ' + '      ' +
                    ' || ' + sum.toFixed(2) + '\n';
            else
                statement += formatDate + ' || ' + '      ' + ' || ' + Math.abs(transaction.amount * (-1)).toFixed(2) +
                    ' || ' + sum.toFixed(2) + '\n';
        }
        console.log(statement);
        return statement;
    }
}
exports.StatementFormatter = StatementFormatter;
