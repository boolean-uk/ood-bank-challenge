"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = require("../src/Account");
const CheckingAccount_1 = require("../src/CheckingAccount");
const js_joda_1 = require("js-joda");
//testing CheckingAccount
describe('CheckingAccount', () => {
    let account;
    let bankstatement;
    test('Should deposit correctly', () => {
        account = new CheckingAccount_1.CheckingAccount(123, 'abc123');
        account.deposit(1000);
        account.deposit(2000);
        expect(Account_1.Account.Balance()).toBe(3000);
    });
    test('Should withdraw correctly (without Overdraft)', () => {
        account = new CheckingAccount_1.CheckingAccount(123, 'abc123');
        account.deposit(3000);
        account.withdraw(1000);
        expect(Account_1.Account.Balance()).toBe(2000);
        account.withdraw(3000);
        expect(Account_1.Account.Balance()).toBe(2000);
        expect(account.withdraw(3000)).toBe(false);
    });
    test('Should withdraw correctly (with Overdraft)', () => {
        account = new CheckingAccount_1.CheckingAccount(123, 'abc123');
        account.Overdraft(true);
        account.deposit(3000);
        account.withdraw(1000);
        expect(Account_1.Account.Balance()).toBe(2000);
        expect(account.withdraw(3000)).toBe(false);
        expect(account.withdraw(2500)).toBe(true);
        expect(Account_1.Account.Balance()).toBe(-500);
    });
    test('Should get hour', () => {
        account = new CheckingAccount_1.CheckingAccount(123, 'abc123');
        account.deposit(3000);
        expect(account.getTransactionHour(0)).toBe(js_joda_1.LocalDateTime.now().hour());
    });
});
