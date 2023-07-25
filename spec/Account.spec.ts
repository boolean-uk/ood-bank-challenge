import { Account } from "../src/Account"

describe("Account tests", () => {
    let account: Account;

    beforeEach(() => {
        account = new Account("12345")
    })

    it("should create account", () => {
        expect(account.accountNum).toEqual("12345")
        expect(account.transactions.length).toEqual(0)
    })

    it("should make a deposit", () => {
        account.deposit(10000)
        expect(account.transactions.length).toEqual(1)
    })

    it("should make a withdraw", () => {
        account.withdraw(10000)
        expect(account.transactions.length).toEqual(1)
    })

    it("should make both a withdraw and a deposit", () => {
        account.withdraw(10000)
        account.deposit(11000)
        expect(account.transactions.length).toEqual(2)
    })

    it("should calculate total balance in account", () => {
        account.deposit(10000)
        expect(account.calculateBalance()).toEqual(10000)
    })

    it("should calculate total balance in account, different combination", () => {
        account.deposit(10000)
        account.deposit(11000)
        account.withdraw(9000)
        expect(account.calculateBalance()).toEqual(12000)
    })

})