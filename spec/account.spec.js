import { Account } from "../src/account.js"
import { Transaction } from "../src/transactions.js"
import Bank from "../src/bank.js"

describe('Account', () => {
    let account
    let date
    beforeEach(() => {
        account = new Account('Frank', 'Zappa')
        date = '13/12/24'
    })
    it('should create an account using their first and last name', () => {
        const result = new Account('Frank', 'Zappa')
        expect(result.firstName).toBe('Frank')
        expect(result.lastName).toBe('Zappa')
        expect(result.credit).toBe(0)
    })
    it('should allow an account holder to deposit money into their account', () => {
        account.deposit(1000, '13/12/24')
        expect(account.credit).toBe(1000)
    })
    it('should generate a transaction object that stores the amount credited or debited', () => {
        let date = '13/12/24'
        account.createTransaction(date)
        const transaction = new Transaction(1, date)
        expect(transaction).toEqual(account.transactions[0])
    })
    it('should allow an account holder to withdraw money from their account', () => {
        account.deposit(50, date)
        account.withdraw(10, date)
        expect(account.credit).toBe(50)
        expect(account.debit).toBe(10)
        expect(account.transactions.length).toBe(2)
    })
    it('should get the balance of the account', () => {
        const result = account.getBalance(50, 10)
        expect(result).toBe(40.00)
    })
    it('should check if a transaction is defined', () => {
        const firstTransaction = account.checkTransaction(1.50)
        const secondTransaction = account.checkTransaction(undefined)
        expect(firstTransaction).toBe('£1.50')
        expect(secondTransaction).toBe('      ')
    })
    it('should round numbers to two decimal places', () => {
        const first = account.round(15)
        const second = account.round(1.2)
        expect(first).toBe(15.00)
        expect(second).toBe(1.20)
    })
})

describe('Bank', () => {
    let bank
    let account
    let date
    beforeEach(() => {
        bank = new Bank()
        account = new Account('Frank', 'Zappa')
        date = '13/12/24'
    })
    it('should throw an error if it is passed an item that is not an object', () => {
        expect(() => bank.accountTransactions('Frank Zappa')).toThrow('Invalid entry')
    })
    it('should add the account transactions into the accounts array', () => {
        account.deposit(50, date)
        bank.accountTransactions(account)
        expect(bank.accounts.length).toBe(1)
        expect(bank.accounts[0].credit).toBe(50)
    })
})