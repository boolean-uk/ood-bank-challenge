
import { BankAccount} from "../src"

describe ("Bank account tests", () => {
    let bankAccount : BankAccount

    beforeEach(() =>{
        bankAccount = new BankAccount();        
    })

     describe("different tests for deposit operation on bank account", () => {

         it("should deposit 200 to accout", () => {
             bankAccount.deposit(200, new Date());
             expect(bankAccount.getBalance()).toEqual(200);
             bankAccount.deposit(200.55, new Date());
             expect(bankAccount.getBalance()).toEqual(400.55);
         })

         it("shouldn't deposit negative or 0", () => {
            bankAccount.deposit(200, new Date());
            bankAccount.deposit(-200, new Date());
            expect(bankAccount.getBalance()).toEqual(200);
         })
     })

     describe("tests for withdraw operation", () => {

        it("should withdraw 200 from account", () => {
            bankAccount.deposit(200, new Date())
            expect(bankAccount.getBalance()).toEqual(200);
            bankAccount.withdraw(200, new Date())
            expect(bankAccount.getBalance()).toEqual(0);
        })

        it("shouldn't withdraw below 0 from account", () => {
            bankAccount.deposit(200, new Date())
            expect(bankAccount.getBalance()).toEqual(200);
            bankAccount.withdraw(200, new Date())
            expect(bankAccount.getBalance()).toEqual(0);
            bankAccount.withdraw(200, new Date())
            expect(bankAccount.getBalance()).toEqual(0);
        })

        it("shouldn't withdraw if amount is negative", () => {
            bankAccount.deposit(200, new Date())
            expect(bankAccount.getBalance()).toEqual(200);
            bankAccount.withdraw(-200, new Date())
            expect(bankAccount.getBalance()).toEqual(200);
        })
     })
      
     describe("testing print statement", () => {
        it("should print correctly", () => {
            const date = new Date("14/01/2012")
            const date1 = new Date("13/01/2012")
            const date2 = new Date("10/01/2012")
            bankAccount.deposit(1000, date2)
            bankAccount.deposit(2000, date1)
            bankAccount.withdraw(500, date)

            const correctStatement = `date       || credit  || debit  || balance
            14/01/2012 ||         || 500.00 || 2500.00
            13/01/2012 || 2000.00 ||        || 3000.00
            10/01/2012 || 1000.00 ||        || 1000.00`

            const statementFromPrintMethod = bankAccount.printStatement()
            expect(statementFromPrintMethod).toContain(correctStatement)
        })
     })
    
})