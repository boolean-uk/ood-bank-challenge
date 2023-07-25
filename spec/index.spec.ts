
import { BankAccount } from "../src"

describe ("Bank account tests", () => {
    let bankAccount : BankAccount

    beforeEach(() =>{
        bankAccount = new BankAccount();
    })

     describe("different tests for deposit operation on bank account", () =>{
         it("should deposit 200 to accout", () => {
             bankAccount.deposit(200, "01/01/2022");
             expect(bankAccount.balance).toEqual(200);
         })
     }) 

    
})