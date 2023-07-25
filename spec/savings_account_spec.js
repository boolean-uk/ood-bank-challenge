"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const savings_account_1 = require("../src/savings_account");
describe('SavingsAccount', function () {
    let account;
    beforeEach(() => {
        account = new savings_account_1.SavingsAccount();
    });
    it('deposit adds transaction', function () {
        account.deposit(19.99);
        account.deposit(19.99);
        expect(account.getBalance()).toEqual(39.98);
    });
    it('deposit throws exception for negative amount', function () {
        expect(() => { account.deposit(-20); }).toThrow();
    });
    it('withdraw adds transaction', function () {
        account.deposit(19.99);
        account.deposit(19.99);
        account.withdraw(19.99);
        expect(account.getBalance()).toEqual(19.99);
    });
    it('withdraw throws exception when balance is insufficient', function () {
        expect(() => { account.withdraw(19.99); }).toThrow();
    });
    it('withdraw throws exception for negative amount', function () {
        expect(() => { account.withdraw(-10); }).toThrow();
    });
});
