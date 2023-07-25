
import { BankAccount } from "../src"

describe ("Bank account tests", () => {
    let bankAccount : BankAccount

    beforeEach(() =>{
        bankAccount = new BankAccount();
    })

     describe("different tests for deposit operation on bank account", () =>{
         it("should deposit 200 to accout", () => {
             bankAccount.deposit(200, new Date());
             expect(bankAccount.getBalance()).toEqual(200);
         })
         it("shouldn't deposit negative or 0", () =>{
            bankAccount.deposit(200, new Date());
            bankAccount.deposit(-200, new Date());
            expect(bankAccount.getBalance()).toEqual(200);
         })
     }) 

    
})