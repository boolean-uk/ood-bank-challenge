import BankAccount from "../src/index.js";

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
        expect(bankAccount.balance).toBe(1000)
    })

    it('should be able to withdraw money', () => {
        bankAccount.deposite(1000)
        bankAccount.withdraw(500)
        expect(bankAccount.balance).toBe(500)
    })
})