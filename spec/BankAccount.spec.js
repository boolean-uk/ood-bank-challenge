import { BankAccount } from "../src/BankAccount.js"

describe('BankAccount', () => {
    let account

    beforeEach(() => {
        account = new BankAccount()
    })

    it('should deposit money correctly', () => {
        account.deposit(100000, '10/01/2012')
        const transactions = account.getTransactions()
        expect(transactions.length).toBe(1)
        expect(transactions[0].amount).toBe(100000)
        expect(transactions[0].type).toBe('credit')
        expect(transactions[0].date).toBe('11/01/2012')
    })

    it('should calculate balance correctly after deposit', () => {
        account.deposit(100000, '10/01/2012')
        expect(account.calculateBalance()).toBe(100000)
    })
})
