import { Account } from './Account';
import {Transaction} from "./Transaction";

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
        const depositAmount = 1000;

        account.depositMoney(depositAmount);
        const initialTransactionHistorySize = account.getTransactionHistory().length;

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

    it("should return account history", () => {
        account.addTransaction(new Transaction(1000, 'deposit', new Date('2022-02-10')))
        account.addTransaction(new Transaction(2000, 'deposit', new Date('2022-02-12')))
        account.addTransaction(new Transaction(500, 'withdrawal', new Date('2022-02-13')))

        let result: string = account.generateBankStatement()
        const expected: string[] = []
        expected.push("date       || credit  ||  debit  || balance\n");
        expected.push("10/2/2022  || 1000    ||         || 1000\n");
        expected.push("12/2/2022  || 2000    ||         || 3000\n");
        expected.push("13/2/2022  ||         || 500     || 2500\n");

        expect(result).toBe(expected.join(""));
    });
});
