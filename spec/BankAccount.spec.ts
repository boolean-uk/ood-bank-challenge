import BankAccount from "../src/BankAccount"
import Transaction from "../src/Transaction"

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
});