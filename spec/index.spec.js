import BankAccount from "../src/index.js";

describe('Bank account', () => {
    let bankAccount

    beforeEach(() => {
        bankAccount = new BankAccount()
    })

    it('should exist', () => {
        expect(bankAccount).toBeInstanceOf(BankAccount)
        expect(bankAccount.balance).toBe('0')
    })

    it('should be able to deposit money', () => {
        bankAccount.deposite(1000)

        expect(bankAccount.balance).toBe('1000.00')
    })

    it('should be able to withdraw money', () => {
        bankAccount.deposite(1000)
        bankAccount.withdraw(500)

        expect(bankAccount.balance).toBe('500.00')
    })

    it('should be able to print a statement', () => {
        const date = new Date()
        bankAccount.deposite(1000)
        bankAccount.deposite(2000)
        bankAccount.withdraw(500)

        const result = bankAccount.getStatement()

        expect(result).toBe(`date || credit || debit || balance\n${date} ||  || 500.00 || 2500.00\n${date} || 2000.00 ||  || 3000.00\n${date} || 1000.00 ||  || 1000.00\n`)
    })
})