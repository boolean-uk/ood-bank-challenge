"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/restrict-plus-operands */
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
    it('deposit does not allow to deposit more than 20,000 per year', function () {
        account.deposit(20000);
        expect(() => account.deposit(1)).toThrow();
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
    it('generateStatement returns statement', function () {
        const date = new Date();
        const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        account.deposit(19.99);
        account.deposit(19.99);
        account.withdraw(19.99);
        expect(account.generateStatement()).toEqual('date || credit || debit || balance\n' +
            `${formattedDate} || || 19.99 || 19.99\n` +
            `${formattedDate} || 19.99 || || 39.98\n` +
            `${formattedDate} || 19.99 || || 19.99\n`
                .trim());
    });
});
