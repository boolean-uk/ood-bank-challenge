import Bank from "../index.js"

describe("Bank", () => {
    let bank
    beforeEach(() => {
        bank = new Bank("12/6/2024", [{user: 1, password: "asdf", transactions: [{date: "11/6/2024", type: "debit", amount: 250.00}, {date: "10/6/2024", type: "credit", amount: 500.00}]}, {user: 2, password: "john", transactions: []}])
    })
    it("should exist", () => {
        expect(bank).toBeInstanceOf(Bank)
    })
    it("should be able to update the date", () => {
        bank.date("21/6/2024")
        expect(bank.dateValue).toEqual("21/6/2024")
    })
    it("should throw an error if the date isn't a string", () => {
        expect(() => bank.date(2)).toThrow("date must be a string")
    })
    it("should allow a user to log in", () => {
        bank.logIn(1, "asdf")
        expect(bank.loggedIn).toEqual(true)
    })
    it("should throw an error if the password is incorrect", () => {
        expect(() => bank.logIn(1, "qwer")).toThrow("Password incorrect")
    })
    it("should allow a logged in user to make a deposit", () => {
        bank.logIn(1, "asdf")
        expect(bank.deposit(500)).toEqual("500 deposited")    
    })
    it("should allow a logged in user to make a withdrawl", () => {
        bank.logIn(1, "asdf")
        expect(bank.withdrawl(50)).toEqual("50 withdrawn")
    })
    it("should allow for a bank statement to be displayed", () => {
        bank.logIn(1, "asdf")
        expect(bank.statement()).toEqual([console.log("Date       || Credit     || Debit      || Balance"), console.log(`11/6/2024  ||            || 250        || 250`), console.log(`10/6/2024  || 500        ||            || 500`)])
    })
})