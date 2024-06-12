import { Transaction } from "../src/Transaction.js"

describe('Transaction', () => {
    it('should create a transaction correctly', () => {
        const transaction = new Transaction('10/01/2012', 100000, 'credit', 100000)
        const details = transaction.getDetails()
        expect(details.date).toBe('10/01/2012')
        expect(details.amount).toBe(100000)
        expect(details.type).toBe('credit')
        expect(details.balance).toBe(100000)
    })

    it('should return correct details', () => {
        const transaction = new Transaction('13/01/2012', 200000, 'credit', 300000);// 2000 pounds
        const details = transaction.getDetails()
        expect(details).toEqual({
          date: '13/01/2012',
          amount: 200000,
          type: 'credit',
          balance: 300000,
        })
      })
})