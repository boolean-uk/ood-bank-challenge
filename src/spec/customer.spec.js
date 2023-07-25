"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("../customer");
const bankAccount_1 = require("../bankAccount");
const transaction_1 = require("../transaction");
describe("Deposit and withdrawal transactions", () => {
    let customer;
    let account;
    let deposit1;
    let withdrawal1;
    beforeEach(() => {
        account = new bankAccount_1.BankAccount('11111');
        customer = new customer_1.Customer('Alex', account);
        deposit1 = new transaction_1.Transaction(100);
        withdrawal1 = new transaction_1.Transaction(-150);
    });
    it("should deposit funds to the account", () => {
        customer.addTransaction(deposit1);
        customer.addTransaction(deposit1);
        expect(customer.account.balance).toBe(200);
        customer.addTransaction(deposit1);
        expect(customer.account.balance).toBe(300);
    });
    it("should withdraw funds from the account", () => {
        customer.addTransaction(withdrawal1);
        expect(customer.account.balance).toBe(0);
        customer.addTransaction(deposit1);
        expect(customer.account.balance).toBe(100);
        customer.addTransaction(deposit1);
        customer.addTransaction(withdrawal1);
        expect(customer.account.balance).toBe(50);
        customer.addTransaction(deposit1);
        customer.addTransaction(withdrawal1);
        expect(customer.account.balance).toBe(0);
    });
});
