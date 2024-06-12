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
        expect(testAccount.transactions[0].amount).toEqual(10)
        expect(testAccount.transactions[0].constructor.name).toEqual('Credit')
    })

    it('should accepts debits into a list of transactions', () => {
        testAccount.debit(10)

        expect(testAccount.transactions.length).toEqual(1)
        expect(testAccount.transactions[0].amount).toEqual(10)
        expect(testAccount.transactions[0].constructor.name).toEqual('Debit')
    })
})