import { BankAccount } from "./BankAccount"
import { CheckingAccount } from "./CheckingAccount"
import { InvestmentAccount } from "./InvestmentAccount"
import { SavingsAccount } from "./SavingsAccount"
import { Transaction } from "./Transaction"

describe("Core BankAccount tests", () => {
    let bankAccount: BankAccount

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

describe("Extension BankAccount tests", () => {
    let bankAccount: BankAccount

    it("Extension no. 2 withdraw() test", () => {
        bankAccount = new SavingsAccount()
        bankAccount.deposit(1000)
        expect(bankAccount.getBalance()).toEqual(1000)
        expect(bankAccount.withdraw(100)).toEqual(true)
        expect(bankAccount.withdraw(100)).toEqual(true)
        expect(bankAccount.getBalance()).toEqual(790)
        expect(bankAccount.withdraw(1000)).toEqual(false)
        expect(bankAccount.getBalance()).toEqual(790)
        bankAccount.deposit(1000)
        expect(bankAccount.withdraw(1000)).toEqual(true)
        expect(bankAccount.getBalance()).toEqual(785)
    })

    it("Extension no. 3 and no. 4 overdraft test", () => {
        bankAccount = new SavingsAccount()
        expect(bankAccount.addOverdraft(300)).toEqual(false)
        bankAccount = new InvestmentAccount()
        expect(bankAccount.addOverdraft(300)).toEqual(false)
        bankAccount = new CheckingAccount()
        expect(bankAccount.addOverdraft(300)).toEqual(true)
        expect(bankAccount.addOverdraft(200)).toEqual(true)
        expect(bankAccount.addOverdraft(100)).toEqual(false)
        bankAccount = new CheckingAccount()
        expect(bankAccount.addOverdraft(600)).toEqual(false)
        expect(bankAccount.addOverdraft(500)).toEqual(true)
        expect((bankAccount as CheckingAccount).getOverdraft()).toEqual(500)
    })

    it("Extension no. 4 interest test", () => {
        let investmentAccount = new InvestmentAccount()
        investmentAccount.deposit(20000)
        expect(investmentAccount.getInterestRate()).toEqual(2)
        expect(investmentAccount.generateInterestIncome()).toEqual(400)
    })

    
})
