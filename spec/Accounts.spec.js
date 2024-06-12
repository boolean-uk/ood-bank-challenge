import { Account } from '../src/Accounts.js'
import { Credit, Debit } from '../src/Transactions.js'

describe('Accounts', () => {
    let testAccount

    beforeEach(() => {
        testAccount = new Account
    })

    it('should accepts credits into a list of transactions', () => {
        testAccount.credit(10)

        expect(testAccount.transactions.length).toEqual(1)
        expect(Number(testAccount.transactions[0].amount)).toEqual(10)
        expect(testAccount.transactions[0].constructor.name).toEqual('Credit')
    })

    it('should accepts debits into a list of transactions', () => {
        testAccount.debit(10)

        expect(testAccount.transactions.length).toEqual(1)
        expect(Number(testAccount.transactions[0].amount)).toEqual(10)
        expect(testAccount.transactions[0].constructor.name).toEqual('Debit')
    })

    it('should have a method to return all credits to account', () => {
        testAccount.credit(10)
        testAccount.debit(5)
        testAccount.credit(3)

        expect(testAccount.credits.length).toEqual(2)
    })

    it('should have a method to return all debits to account', () => {
        testAccount.credit(10)
        testAccount.debit(5)
        testAccount.debit(3)

        expect(testAccount.debits.length).toEqual(2)
    })

    it('should have a method to return current balance', () => {
       testAccount.credit(23.32)
       testAccount.debit(12.01)

       expect(testAccount.balance).toEqual(11.31)
    })
})