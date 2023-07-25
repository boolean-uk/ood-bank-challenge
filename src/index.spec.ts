import { BankAccount } from "./BankAccount"
import { SavingsAccount } from "./SavingsAccount"
import { Transaction } from "./Transaction"

describe("BankAccount tests", () => {
    let bankAccount: BankAccount

    beforeEach(() => { 
    })

    it("getBalance() test", () => {
        bankAccount = new SavingsAccount()
        expect(bankAccount.getBalance()).toEqual(0)
    })
})

describe("BankAccount tests", () => {
    let transaction: Transaction

    it("gettters test", () => {
        transaction = new Transaction(1000, 5.5)
        expect(transaction.getAmount()).toEqual(1000)
        expect(transaction.getFee()).toEqual(5.5)
        let date = new Date()
        transaction = new Transaction(2000, 0, date)
        expect(transaction.getAmount()).toEqual(2000)
        expect(transaction.getFee()).toEqual(0)
    })
})