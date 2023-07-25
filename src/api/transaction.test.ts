import { Transaction, TransactionInterface } from './transaction';

describe('Transaction Class', () => {
    let transaction: Transaction;

    beforeEach(() => {
        transaction = new Transaction();
    });

    it('should create a transaction correctly', () => {
        const type = 'Deposit';
        const amount = 100;
        const balance = 200;

        // Call the addTransaction method
        const newTransaction: TransactionInterface = transaction.addTransaction(type, amount, balance);

        // Check if the new transaction object has the correct properties
        expect(newTransaction.date).toBeInstanceOf(Date);
        expect(newTransaction.type).toBe(type);
        expect(newTransaction.amount).toBe(amount);
        expect(newTransaction.balance).toBe(balance);
    });
});
