import BankAccount from "../src/index.js";
import currency from "currency.js"

describe('Bank account', () => {
    let bankAccount

    beforeEach(() => {
        bankAccount = new BankAccount()
    })

    it('should exist', () => {
        expect(bankAccount).toBeInstanceOf(BankAccount)
        expect(bankAccount.balance).toBe(0)
    })

    it('should be able to deposit money', () => {
        bankAccount.deposite(1000)

        expect(bankAccount.balance).toEqual(currency(1000.00))
    })

    it('should be able to withdraw money', () => {
        bankAccount.deposite(1000)
        bankAccount.withdraw(500)

        expect(bankAccount.balance).toEqual(currency(500.00))
    })

    it('should be able to print a statement', () => {
        const date = new Date()
        bankAccount.deposite(1000)
        bankAccount.deposite(2000)
        bankAccount.withdraw(500)

        const result = bankAccount.getStatement()

        expect(result).toBe(`date || credit || debit || balance\n${date} ||  || 500.00 || 2500.00\n${date} || 2000.00 ||  || 3000.00\n${date} || 1000.00 ||  || 1000.00\n`)
    })

    it('should output JSON when getting all transactions', () => {
        const date = new Date()
        bankAccount.deposite(1000)
        bankAccount.deposite(2000)
        bankAccount.withdraw(500)

        expect(bankAccount.transactions).toEqual(JSON.stringify([{date: date, credit: 1000, debit: 0}, {date: date, credit: 2000, debit: 0}, {date: date, credit: 0, debit: 500}]))
    })
})