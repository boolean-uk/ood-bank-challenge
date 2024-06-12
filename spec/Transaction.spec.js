import { Transaction } from "../src/Transaction.js"

describe('Transaction', () => {
    it('should create a transaction correctly', () => {
        const transaction = new Transaction('10/01/2012', 100000, 'credit', 100000)
        const details = transaction.getDetails()
        expect(details.date).toBe('10/01/2012')
        expect(details.amount).toBe(100000)
        expect(details.type).toBe('credit')
        expect(details.balance).toBe(200000)
    })
})