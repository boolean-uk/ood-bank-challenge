import { Account } from './Account';

describe('Account tests', () => {
    let account: Account;

    beforeEach(() => {
        account = new Account('Jan Lisek');
    });

    it('should not allow invalid deposits', () => {
        const result = account.depositMoney(-33);
        expect(result).toBe(false);
    });

    it('should allow valid deposits and update transaction history', () => {
        const initialTransactionHistorySize = account.getTransactionHistory().length;
        const depositAmount = 500;

        const result = account.depositMoney(depositAmount);

        expect(result).toBe(true);
        expect(account.getTransactionHistory().length).toBe(initialTransactionHistorySize + 1);
        expect(account.getTransactionHistory()[initialTransactionHistorySize].getAmount()).toBe(depositAmount);
    });

    it('should not allow withdrawals exceeding the balance', () => {
        const initialTransactionHistorySize = account.getTransactionHistory().length;
        const depositAmount = 1000;

        account.depositMoney(depositAmount);

        const result = account.withdrawMoney(2000);

        expect(result).toBe(false);
        expect(account.getTransactionHistory().length).toBe(initialTransactionHistorySize);
    });

    it('should allow valid withdrawals and update transaction history', () => {
        const initialTransactionHistorySize = account.getTransactionHistory().length;
        const depositAmount = 1000;
        const withdrawAmount = 300;

        account.depositMoney(depositAmount);

        const result = account.withdrawMoney(withdrawAmount);

        expect(result).toBe(true);
        expect(account.getTransactionHistory().length).toBe(initialTransactionHistorySize + 2);
        expect(account.getTransactionHistory()[initialTransactionHistorySize + 1].getAmount()).toBe(withdrawAmount);
    });

    it('should calculate the correct balance after transactions', () => {
        account.depositMoney(1000);
        account.withdrawMoney(300);
        account.depositMoney(4000);

        const balance = account.calculateBalance();

        expect(balance).toBe(4700);
    });
});
