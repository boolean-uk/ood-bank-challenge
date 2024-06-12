import { Account } from "../src/account.js"
import { Transaction } from "../src/transactions.js"
import Bank from "../src/bank.js"

describe('Account', () => {
    let account
    beforeEach(() => {
        account = new Account('Frank', 'Zappa')
    })
    it('should create an account using their first and last name', () => {
        const result = new Account('Frank', 'Zappa')
        expect(result.firstName).toBe('Frank')
        expect(result.lastName).toBe('Zappa')
        expect(result.credit).toBe(0)
    })
    it('should allow an account holder to deposit money into their account', () => {
        account.deposit(1000)
        expect(account.credit).toBe(1000)
    })
    it('should generate a transaction object that stores the amount credited or debited', () => {
        account.deposit(50)
        const transaction = new Transaction(1)
        transaction.credit = 50
        expect(transaction).toEqual(account.transactions[0])
    })
    it('should allow an account holder to withdraw money from their account', () => {
        account.deposit(50)
        account.withdraw(10)
        expect(account.credit).toBe(50)
        expect(account.debit).toBe(10)
        expect(account.transactions.length).toBe(2)
    })
    it('should get the balance of the account', () => {
        account.deposit(50)
        account.withdraw(10)
        const result = account.getBalance()
        const expected = 'Frank Zappa your balance is, £40'
        expect(result).toBe(expected)
    })
})

describe('Bank', () => {
    let bank
    let account
    beforeEach(() => {
        bank = new Bank()
        account = new Account('Frank', 'Zappa')
    })
    it('should throw an error if it is passed an item that is not an object', () => {
        expect(() => bank.accountTransactions('Frank Zappa')).toThrow('Invalid entry')
    })
    it('should add the account transactions into the accounts array', () => {
        account.deposit(50)
        bank.accountTransactions(account)
        expect(bank.accounts.length).toBe(1)
        expect(bank.accounts[0].credit).toBe(50)
    })
})