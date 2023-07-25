import {
    SavingsAccount
} from '../src/savings_account';
describe('SavingsAccount', function () {
    const account: Account;

    beforeEach(() => {
        account = new Account();
    })

    it('deposit adds transaction', function () {
        account.deposit(19.99)
        account.deposit(19.99)

        expect(account.getBalance()).toEqual(39.98);
    })

    it('deposit throws exception for negative amount', function () {
        expect(account.deposit()).toThrow();
    })

})
