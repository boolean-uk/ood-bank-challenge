import BankAccount from "../src/BankAccount"
import Transaction from "../src/Transaction"

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
    
    beforeEach(() => {
        bankAccount = new BankAccount();
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
        // Mock Date.now() to always return the same time
        const mockDate = new Date(2022, 7, 25);
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);

        const hour_minute = new Date().getHours() + ":" + new Date().getMinutes();
        const transaction = new Transaction(100, 100, new Date().toLocaleDateString(), hour_minute);

        bankAccount.deposit(100);

        expect(bankAccount.balance).toEqual(100);
        expect(bankAccount.transactions).toContainEqual(transaction);
    });

    it('should have a balance of 300 when depositing 100 and 200', () => {
        bankAccount.deposit(100);
        bankAccount.deposit(200);

        expect(bankAccount.balance).toEqual(300);
    });

    it('should not allow a negative deposit', () => {
        expect(() => {
            bankAccount.deposit(-100);
        }).toThrowError('You cannot deposit a negative amount');
    });

    it('should have a balance of 50 when depositing 100 and withdrawing 50', () => {
        bankAccount.deposit(100);
        bankAccount.withdraw(50);

        expect(bankAccount.balance).toEqual(50);
    });

    it('should not allow a negative withdrawal', () => {
        expect(() => {
            bankAccount.withdraw(-100);
        }).toThrowError('You cannot withdraw a negative amount');
    });

    it('should not allow a withdrawal greater than the balance', () => {
        expect(() => {
            bankAccount.withdraw(100);
        }).toThrowError('You cannot withdraw more than your balance');
    });

    it('should have a balance of 0 when depositing 100 and withdrawing 100', () => {
        bankAccount.deposit(100);
        bankAccount.withdraw(100);

        expect(bankAccount.balance).toEqual(0);
    });

    it('should keep track of all transactions', () => {
        // Mock Date.now() to always return the same time
        const mockDate = new Date(2022, 7, 25);
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);

        const hour_minute = new Date().getHours() + ":" + new Date().getMinutes();

        bankAccount.deposit(100);
        bankAccount.withdraw(50);
        bankAccount.deposit(200);
        bankAccount.withdraw(100);
        bankAccount.deposit(300);

        const transactions = [
            new Transaction(100, 100, new Date().toLocaleDateString(), hour_minute),
            new Transaction(-50, 50, new Date().toLocaleDateString(), hour_minute),
            new Transaction(200, 250, new Date().toLocaleDateString(), hour_minute),
            new Transaction(-100, 150, new Date().toLocaleDateString(), hour_minute),
            new Transaction(300, 450, new Date().toLocaleDateString(), hour_minute)
        ];

        expect(bankAccount.transactions).toEqual(transactions);
    });
});