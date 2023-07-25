import "jasmine"
import BankAccount from "../../src/BankAccount"

describe("Testing", () => {
    let bankAccount: BankAccount

    beforeEach(() => {
        bankAccount = new BankAccount()
    })
    
    it("should return true", () => {
        let result: boolean = bankAccount.deposit(100, new Date())

        expect(result).toBe(true)
    })

    it("negative amount should return false", () => {
        let result: boolean = bankAccount.deposit(-1000, new Date())

        expect(result).toBe(false);
    });

    it("should return true", () => {
        bankAccount.deposit(1000, new Date())
        let result: boolean = bankAccount.withdraw(1000, new Date())

        expect(result).toBe(true);
    });


    it("withdraw amount too high should return false", () => {
        bankAccount.deposit(1000, new Date())
        let result: boolean = bankAccount.withdraw(1100, new Date())

        expect(result).toBe(false);
    });
    
});
