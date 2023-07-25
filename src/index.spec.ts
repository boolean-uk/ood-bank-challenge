import { BankAccount } from "./BankAccount"
import { SavingsAccount } from "./SavingsAccount"

describe("BankAccount tests", () => {
    let bankAccount: BankAccount

    beforeEach(() => { 
    })

    it("getBalance() test", () => {
        bankAccount = new SavingsAccount()
        expect(bankAccount.getBalance()).toEqual(0)
    
    })
})