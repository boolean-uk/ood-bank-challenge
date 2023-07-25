import { Account } from "../src/account"

describe("Basic account operations", () => {

    let account: Account

    beforeEach(() => {
        account = new Account("1234")
    })

    it("should increase transaction count", () => {
        account.deposit(100000, new Date())
        expect(account.getTransactions().length).toEqual(1)
    })

    it("should init with balance 0", () => {
        expect(account.getBalance()).toEqual(0)
    })

    it("should return balance", () => {
        account.deposit(100000, new Date())
        account.deposit(200000, new Date())
        account.withdraw(50000, new Date())
        
        expect(account.getBalance()).toEqual(250000)
    })

    it("should throw error when no money", () => {
        expect(() => account.withdraw(50000, new Date())).toThrow("You don't have that much money.")
    })

})