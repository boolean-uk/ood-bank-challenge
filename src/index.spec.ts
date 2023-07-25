import { BankAccount } from "./BankAccount"
import { CheckingAccount } from "./CheckingAccount"
import { InvestmentAccount } from "./InvestmentAccount"
import { SavingsAccount } from "./SavingsAccount"
import { Transaction } from "./Transaction"

describe("BankAccount tests", () => {
    let bankAccount: BankAccount

    beforeEach(() => { 
    })

    it("getBalance(), withdraw(), and balance() test", () => {
        bankAccount = new SavingsAccount()
        bankAccount.deposit(1000)
        expect(bankAccount.getBalance()).toEqual(1000)
        expect(bankAccount.withdraw(100)).toEqual(true)
        expect(bankAccount.withdraw(100)).toEqual(true)
        expect(bankAccount.getBalance()).toEqual(790)
        expect(bankAccount.withdraw(1000)).toEqual(false)
        expect(bankAccount.getBalance()).toEqual(790)
    })

    it("addOverdraft() test", () => {
        bankAccount = new SavingsAccount()
        expect(bankAccount.addOverdraft(100)).toEqual(false)
        bankAccount = new InvestmentAccount()
        expect(bankAccount.addOverdraft(100)).toEqual(false)  
        bankAccount = new CheckingAccount()
        expect(bankAccount.addOverdraft(100)).toEqual(true)
        expect(bankAccount.addOverdraft(500)).toEqual(false)
        expect((bankAccount as CheckingAccount).getOverdraft()).toEqual(100)
    })
})

describe("Transaction tests", () => {
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