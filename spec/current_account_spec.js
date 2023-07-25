"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const current_account_1 = require("../src/current_account");
describe('CurrentAccount', function () {
    let account;
    beforeEach(() => {
        account = new current_account_1.CurrentAccount();
    });
    it('withdraw allows to withdraw overdraft when allowed', function () {
        if (account instanceof current_account_1.CurrentAccount)
            account.approveOverdraft();
        account.withdraw(current_account_1.CurrentAccount.OVERDRAFT);
        expect(account.getBalance()).toEqual(current_account_1.CurrentAccount.OVERDRAFT * -1);
    });
    it('withdraw does not allow to withdraw overdraft when not allowed', function () {
        expect(() => account.withdraw(current_account_1.CurrentAccount.OVERDRAFT)).toThrow();
    });
});
