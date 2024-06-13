import { BankAccount } from "../src/BankAccount.js"

describe('BankAccount', () => {
    let account

    beforeEach(() => {
        account = new BankAccount('Checking')
    })

    it('should deposit money correctly', () => {
        account.deposit(100000, '2012-01-10')
        const transactions = account.getTransactions()
        expect(transactions.length).toBe(1)
        expect(transactions[0].getDetails().amount).toBe(100000)
        expect(transactions[0].getDetails().type).toBe('credit')
        expect(transactions[0].getDetails().date).toBe('2012-01-10')
    })

    it('should calculate balance correctly after deposit', () => {
        account.deposit(100000, '2012-01-10')
        expect(account.calculateBalance()).toBe(100000)
    })

    it('should withdraw money correctly after deposit', () => {
        account.deposit(100000, '2012-01-10')
        account.withdraw(50000, '2012-01-14')
        const transactions = account.getTransactions()
        expect(transactions.length).toBe(2)
        expect(transactions[1].getDetails().amount).toBe(50000)
        expect(transactions[1].getDetails().type).toBe('debit')
        expect(transactions[1].getDetails().date).toBe('2012-01-14')
    })

    it('should print the statement correctly', () => {
        account.deposit(100000, '2012-01-10')
        account.deposit(200000, '2012-01-13')
        account.withdraw(50000, '2012-01-14')
        const statement = account.printStatement()
        expect(statement).toContain('14/01/2012 ||        || 500.00 || 2500.00')
        expect(statement).toContain('13/01/2012 || 2000.00 ||        || 3000.00')
        expect(statement).toContain('10/01/2012 || 1000.00 ||        || 1000.00')
    })

    it('should generate a statement between two dates', () => {
        account.deposit(100000, '2012-01-10')
        account.deposit(200000, '2012-01-13')
        account.withdraw(50000, '2012-01-14')
        const statement = account.generateStatement('2012-01-12', '2012-01-15')
        expect(statement).toContain('14/01/2012 ||        || 500.00 || 2500.00')
        expect(statement).toContain('13/01/2012 || 2000.00 ||        || 3000.00')
    })

    it('should add overdraft limit correctly', () => {
        expect(account.calculateAvailableFunds()).toBe(50000)
    })

    it('should calculate available funds correctly', () => {
        account.deposit(100000, '2012-01-10')
        account.withdraw(50000, '2012-01-14')
        expect(account.calculateAvailableFunds()).toBe(100000) // 50000 balance + 50000 overdraft
    })

    it('should not allow withdrawal to exceed the funds available', () => {
        expect(() => {
            account.withdraw(150000, '2012-01-14')
        }).toThrowError('Insufficient Funds')
    })

    it('should throw error if deposit limit is exceeded for Savings account', () => {
        const savingsAccount = new BankAccount('Savings')
        savingsAccount.deposit(1500000, '2023-01-01')
        expect(() => {
            savingsAccount.deposit(60000, '2023-01-01')
        }).toThrowError('Deposit limit exceeded for Savings account')
    })
})
