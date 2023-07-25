import { Bank } from "../bank"

describe("Bank tests", () => {
    let bank: Bank

    beforeEach(() => { 
        bank = new Bank()
    })

    it("should not add funds, funds number is negatice", () => {
        expect(bank.addFunds(-100)).toThrowError("Funds number cannot be negative")
    })

    it("should add funds, funds number is positive", () => {
        const fundsToAdd = 100
        bank.addFunds(fundsToAdd);
        expect(bank.getBalance()).toBe(fundsToAdd);
    })
})