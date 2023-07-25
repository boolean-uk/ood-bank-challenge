"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("../customer");
const bankAccount_1 = require("../bankAccount");
const transaction_1 = require("../transaction");
const statementFormatter_1 = require("../statementFormatter");
describe("Bank statement formatter", () => {
    let customer;
    let account;
    let deposit1;
    let deposit2;
    let withdrawal1;
    let withdrawal2;
    let formatter;
    beforeEach(() => {
        account = new bankAccount_1.BankAccount('11111');
        customer = new customer_1.Customer('Alex', account);
        deposit1 = new transaction_1.Transaction(100);
        deposit2 = new transaction_1.Transaction(250);
        withdrawal1 = new transaction_1.Transaction(-150);
        withdrawal2 = new transaction_1.Transaction(-200);
        formatter = new statementFormatter_1.StatementFormatter(customer);
    });
    it("should print and return formatted bank statement", () => {
        customer.addTransaction(deposit1);
        customer.addTransaction(withdrawal2);
        customer.addTransaction(deposit2);
        customer.addTransaction(deposit2);
        customer.addTransaction(withdrawal1);
        customer.addTransaction(withdrawal2);
        customer.addTransaction(deposit2);
        customer.addTransaction(withdrawal2);
        expect(customer.account.balance).toBe(300);
        let expected = 'date       || credit || debit  || balance\n' +
            '25/07/2023 || 100.00 ||        || 100.00\n' +
            '25/07/2023 || 250.00 ||        || 350.00\n' +
            '25/07/2023 || 250.00 ||        || 600.00\n' +
            '25/07/2023 ||        || 150.00 || 450.00\n' +
            '25/07/2023 ||        || 200.00 || 250.00\n' +
            '25/07/2023 || 250.00 ||        || 500.00\n' +
            '25/07/2023 ||        || 200.00 || 300.00';
        expect(formatter.generateStatement().trim()).toBe(expected);
    });
});
