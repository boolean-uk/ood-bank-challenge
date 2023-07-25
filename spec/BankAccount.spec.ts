import BankAccount from "../src/BankAccount"
import Transaction from "../src/Transaction"
import os from "os";

describe('Transaction', () => {
    let transaction: Transaction;

    beforeEach(() => {
        transaction = new Transaction(100, 100, "25/08/2022", "10:00");
    });

    it('should have an amount of 100', () => {
        expect(transaction.amount).toEqual(100);
    });

    it('should have a balance of 100', () => {
        expect(transaction.balance).toEqual(100);
    });

    it('should have a date of 25/08/2022', () => {
        expect(transaction.date).toEqual("25/08/2022");
    });

    it('should have a hour_minute of 10:00', () => {
        expect(transaction.hour_minute).toEqual("10:00");
    });
});

describe('BankAccount', () => {
    let bankAccount: BankAccount;
    let date: Date;

    beforeAll(() => {
        // Mock Date.now() to always return the same time
        const mockDate = new Date(2022, 7, 25);
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);
    });
    
    beforeEach(() => {
        bankAccount = new BankAccount();
        date = new Date();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should have a balance of 0', () => {
        expect(bankAccount.balance).toEqual(0);
    });

    it('should have an empty transactions array', () => {
        expect(bankAccount.transactions).toEqual([]);
    });

    it('should have a balance of 100 when depositing 100', () => {
        const hour_minute = date.getHours() + ":" + date.getMinutes();
        const transaction = new Transaction(100, 100, date.toLocaleDateString('en-GB'), hour_minute);

        bankAccount.deposit(100, date);

        expect(bankAccount.balance).toEqual(100);
        expect(bankAccount.transactions).toContainEqual(transaction);
    });

    it('should have a balance of 300 when depositing 100 and 200', () => {
        bankAccount.deposit(100, date);
        bankAccount.deposit(200, date);

        expect(bankAccount.balance).toEqual(300);
    });

    it('should not allow a negative deposit', () => {
        expect(() => {
            bankAccount.deposit(-100, date);
        }).toThrowError('You cannot deposit a negative amount');
    });

    it('should have a balance of 50 when depositing 100 and withdrawing 50', () => {
        bankAccount.deposit(100, date);
        bankAccount.withdraw(50, date);

        expect(bankAccount.balance).toEqual(50);
    });

    it('should not allow a negative withdrawal', () => {
        expect(() => {
            bankAccount.withdraw(-100, date);
        }).toThrowError('You cannot withdraw a negative amount');
    });

    it('should not allow a withdrawal greater than the balance', () => {
        expect(() => {
            bankAccount.withdraw(100, date);
        }).toThrowError('You cannot withdraw more than your balance');
    });

    it('should have a balance of 0 when depositing 100 and withdrawing 100', () => {
        bankAccount.deposit(100, date);
        bankAccount.withdraw(100, date);

        expect(bankAccount.balance).toEqual(0);
    });

    it('should keep track of all transactions', () => {
        const hour_minute = date.getHours() + ":" + date.getMinutes();

        bankAccount.deposit(100, date);
        bankAccount.withdraw(50, date);
        bankAccount.deposit(200, date);
        bankAccount.withdraw(100, date);
        bankAccount.deposit(300, date);

        const transactions = [
            new Transaction(100, 100, date.toLocaleDateString('en-GB'), hour_minute),
            new Transaction(-50, 50, date.toLocaleDateString('en-GB'), hour_minute),
            new Transaction(200, 250, date.toLocaleDateString('en-GB'), hour_minute),
            new Transaction(-100, 150, date.toLocaleDateString('en-GB'), hour_minute),
            new Transaction(300, 450, date.toLocaleDateString('en-GB'), hour_minute)
        ];

        expect(bankAccount.transactions).toEqual(transactions);
    });

    it('should produce a statement', () => {
        bankAccount.deposit(1000, new Date(2012, 0, 10));
        bankAccount.deposit(2000, new Date(2012, 0, 13));
        bankAccount.withdraw(500, new Date(2012, 0, 14));

        const statement = "date       || credit  || debit  || balance" + os.EOL +
        "14/01/2012 ||         || 500.00 || 2500.00" + os.EOL +
        "13/01/2012 || 2000.00 ||        || 3000.00" + os.EOL +
        "10/01/2012 || 1000.00 ||        || 1000.00" + os.EOL;

        expect(bankAccount.generateWholeStatement()).toEqual(statement);
        const stmt = bankAccount.generateStatementFromTo(new Date(2012, 0, 10), new Date(2012, 0, 14));
        expect(stmt).toEqual(statement);
    });
});