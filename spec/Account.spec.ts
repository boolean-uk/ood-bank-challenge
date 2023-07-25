import { Account } from '../src/Account'
import { CheckingAccount } from '../src/CheckingAccount'

//testing CheckingAccount
describe('CheckingAccount', () => {
    let account: CheckingAccount;

    test('Should deposit correctly', () => {
        account = new CheckingAccount(123, 'abc123');
        account.deposit(1000);
        account.deposit(2000);

        expect(Account.Balance()).toBe(3000);
    });

    test('Should withdraw correctly (without Overdraft)', () => {
        account = new CheckingAccount(123, 'abc123');
        account.deposit(3000);
        account.withdraw(1000);

        expect(Account.Balance()).toBe(2000);

        account.withdraw(3000);
        expect(Account.Balance()).toBe(2000);
        expect(account.withdraw(3000)).toBe(false);
    });

    test('Should withdraw correctly (with Overdraft)', () => {
        account = new CheckingAccount(123, 'abc123');
        account.Overdraft(true);
        account.deposit(3000);
        account.withdraw(1000);
        expect(Account.Balance()).toBe(2000);

        expect(account.withdraw(3000)).toBe(false);
        expect(account.withdraw(2500)).toBe(false); //False, because Overdraft
        // is disabling after withdraw amount exceeds the available funds
        account.Overdraft(true);
        expect(account.withdraw(2500)).toBe(true);
        expect(Account.Balance()).toBe(-500);
    });

});