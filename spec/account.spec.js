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
    })
    it('should allow an account holder to deposit money into their account', () => {
        account.deposit(1000, date)
        const expected = (1000).toFixed(2)
        expect(account.transactions[0].credit).toBe(expected)
    })
    it('should throw an error if a date is not entered with the deposit or withdraw amount', () => {
        expect(() => account.deposit(150)).toThrow('Invalid date, must be dd/mm/yy')
        expect(() => account.withdraw(150)).toThrow('Invalid date, must be dd/mm/yy')
    })
    it('should generate a transaction object that stores the amount credited or debited', () => {
        account.createTransaction(date)
        const transaction = new Transaction(1, date)
        expect(transaction).toEqual(account.transactions[0])
    })
    it('should allow an account holder to withdraw money from their account', () => {
        account.deposit(50, date)
        account.withdraw(10, date)
        const expected = (50).toFixed(2)
        const secondExpected = (10).toFixed(2)
        expect(account.transactions[0].credit).toBe(expected)
        expect(account.transactions[1].debit).toBe(secondExpected)
        expect(account.transactions.length).toBe(2)
    })
    it('should get the balance of the account', () => {
        account.deposit(50, date)
        account.withdraw(10, date)
        const result = account.getBalance(50, 10)
        const expected = (40).toFixed(2)
        expect(result).toBe(expected)
    })
    it('should check if a transaction is defined', () => {
        const result = (1.5).toFixed(2)
        const example = (1.5).toFixed(2)
        const firstTransaction = account.format(example)
        const secondTransaction = account.format(0)
        expect(firstTransaction).toBe(`     £1.50`)
        expect(secondTransaction).toBe('          ')
    })
    it('should round numbers to two decimal places', () => {
        const first = account.round(15)
        const second = account.round(1.2)
        const firstExpected = (15).toFixed(2)
        const secondExpected = (1.2).toFixed(2)
        expect(first).toBe(firstExpected)
        expect(second).toBe(secondExpected)
    })
    it('should generate a bank statement based on account transactions', () => {
        account.deposit(50, date)
        console.log = jasmine.createSpy('log')
        account.printBankStatement()
        const statementHeader = 'date     ||  credit    ||  debit     ||    balance'
        const statementBody = `${account.transactions[0].date} || ${account.format(account.transactions[0].credit)} || ${account.format(account.transactions[0].debit)} || £${account.getBalance()}`
        
        expect(console.log).toHaveBeenCalledWith(statementHeader)
        expect(console.log).toHaveBeenCalledWith(statementBody)
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
        expect(bank.accounts[0].lastName).toBe('Zappa')
    })
})