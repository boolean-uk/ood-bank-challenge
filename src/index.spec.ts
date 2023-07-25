import { BankStatement } from "./BankStatement"
import { Transaction } from "./Transaction"
import { SavingsAccount } from "./SavingsAccount"
import { CheckingAccount } from "./CheckingAccount"
import { InvestmentAccount } from "./InvestmentAccount"

describe("Bank App", () => {
    it("should generate bank statements for savings account", () => {
        const date1 = new Date("2012-01-10")
        const date2 = new Date("2012-01-13")
        const date3 = new Date("2012-01-14")
      
        const transaction1 = new Transaction("1", date1, 1000.0)
        const transaction2 = new Transaction("2", date2, 2000.0)
        const transaction3 = new Transaction("3", date3, -500.0)
      
        const savingsAccount = new SavingsAccount("SAV123")
        savingsAccount.deposit(transaction1.getAmount())
        savingsAccount.deposit(transaction2.getAmount())
        savingsAccount.withdraw(transaction3.getAmount())
      
        const savingsStatement = new BankStatement("1", savingsAccount.getAccountNumber())
        savingsStatement.addTransaction(transaction1)
        savingsStatement.addTransaction(transaction2)
        savingsStatement.addTransaction(transaction3)
      
        const savingsExpectedOutput = `date       || credit  || debit  || balance
2012-01-10 || 1000.00 ||         || 1000.00
2012-01-13 || 2000.00 ||         || 3000.00
2012-01-14 ||         || 500.00 || 2500.00`
      
        expect(savingsStatement.generateStatement()).toBe(savingsExpectedOutput)
      })

      it("should generate bank statements for checking account", () => {
        const date1 = new Date("2012-01-10")
        const date2 = new Date("2012-01-13")
        const date3 = new Date("2012-01-14")
    
        const transaction1 = new Transaction("1", date1, 1000.0)
        const transaction2 = new Transaction("2", date2, 2000.0)
        const transaction3 = new Transaction("3", date3, -500.0)
    
        const checkingAccount = new CheckingAccount("CHK789", 1000)
        checkingAccount.deposit(transaction1.getAmount())
        checkingAccount.deposit(transaction2.getAmount())
        checkingAccount.withdraw(transaction3.getAmount())
    
        const checkingStatement = new BankStatement("3", checkingAccount.getAccountNumber())
        checkingStatement.addTransaction(transaction1)
        checkingStatement.addTransaction(transaction2)
        checkingStatement.addTransaction(transaction3)
    
        const checkingExpectedOutput = `date       || credit  || debit  || balance
2012-01-10 || 1000.00 ||         || 1000.00
2012-01-13 || 2000.00 ||         || 3000.00
2012-01-14 ||         || 500.00 || 2500.00`
    
        expect(checkingStatement.generateStatement()).toBe(checkingExpectedOutput);
      })
    
      it("should generate bank statements for investment account", () => {
        const date1 = new Date("2012-01-10")
        const date2 = new Date("2012-01-13")
        const date3 = new Date("2012-01-14")
    
        const transaction1 = new Transaction("1", date1, 1000.0)
        const transaction2 = new Transaction("2", date2, 2000.0)
        const transaction3 = new Transaction("3", date3, -500.0)
    
        const investmentAccount = new InvestmentAccount("INV456")
        investmentAccount.deposit(transaction1.getAmount())
        investmentAccount.deposit(transaction2.getAmount())
        investmentAccount.withdraw(transaction3.getAmount())
    
        const investmentStatement = new BankStatement("2", investmentAccount.getAccountNumber())
        investmentStatement.addTransaction(transaction1)
        investmentStatement.addTransaction(transaction2)
        investmentStatement.addTransaction(transaction3)
    
        const investmentExpectedOutput = `date       || credit  || debit  || balance
2012-01-10 || 1000.00 ||         || 1000.00
2012-01-13 || 2000.00 ||         || 3000.00
2012-01-14 ||         || 500.00 || 2500.00`
    
        expect(investmentStatement.generateStatement()).toBe(investmentExpectedOutput);
      })
    
    it("should generate ordered bank statements between two dates", () => {
        const date1 = new Date("2012-01-10")
        const date2 = new Date("2012-01-14")
        const date3 = new Date("2012-01-20")
    
        const transaction1 = new Transaction("1", date1, 1000.0)
        const transaction2 = new Transaction("2", date2, 2000.0)
        const transaction3 = new Transaction("3", date3, -500.0)
    
        const statement = new BankStatement("1", "SAV123")
        statement.addTransaction(transaction1)
        statement.addTransaction(transaction2)
        statement.addTransaction(transaction3)
    
        const orderedStatements = statement.getOrderedStatements(date1, date3)
        expect(orderedStatements).toEqual([transaction1, transaction2, transaction3])
      })
})