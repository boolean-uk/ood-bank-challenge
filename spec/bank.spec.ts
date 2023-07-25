import { Bank } from "../bank"

describe("Bank tests", () => {
    let bank: Bank

    beforeEach(() => { 
        bank = new Bank()
    })

    it("should not add funds, funds number is negatice", () => {
        expect(() => bank.addFunds(-100)).toThrowError("Funds number cannot be negative");
    })

    it("should add funds, funds number is positive", () => {
        const fundsToAdd = 100
        bank.addFunds(fundsToAdd);
        expect(bank.getBalance()).toBe(fundsToAdd);
    })

    it("should balance be 600", () => {
        const fundsToAdd = 600
        bank.addFunds(fundsToAdd);
        expect(bank.getBalance()).toBe(fundsToAdd);
    })

    it("should balance be 0", () => {
        expect(bank.getBalance()).toBe(0);
    })

    it("should not get funds, balance after transaction would be negative", () => {
        expect(() => bank.getFunds(100)).toThrowError("Balance after transaction would be negative");
    })

    it("should get funds, balance after transaction would be positive", () => {
        const fundsToAdd = 100
        const fundsToGet = 50
        bank.addFunds(fundsToAdd);
        bank.getFunds(fundsToGet);
        expect(bank.getBalance()).toBe(fundsToAdd - fundsToGet);
    })
})