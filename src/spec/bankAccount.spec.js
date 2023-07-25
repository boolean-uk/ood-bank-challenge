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
    it("should return correct balance", () => {
        customer.addTransaction(deposit1);
        customer.addTransaction(withdrawal1);
        expect(customer.account.balance).toBe(100);
        customer.addTransaction(deposit1);
        expect(customer.account.balance).toBe(200);
        customer.addTransaction(withdrawal1);
        expect(customer.account.balance).toBe(50);
    });
});
