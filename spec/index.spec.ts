
import { BankAccount } from "../src"

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
     }) 

    
})