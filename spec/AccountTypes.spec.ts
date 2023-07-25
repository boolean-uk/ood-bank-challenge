import { SavingAccount } from "../src/accountTypes/SavingAccount";

describe("Account Types tests", () => {
    let savingAccount: SavingAccount
    let investmentAccount: InvestmentAccount
    let checkingAccount: CheckingAccount

    beforeEach(() => {
        savingAccount = new SavingAccount("12345")
    })

    it("should create savings account", () => {
        expect(savingAccount.accountNum).toEqual("12345")
        expect(savingAccount.transactions.length).toEqual(0)
    })

    it("should create investment account", () => {
        expect(investmentAccount.accountNum).toEqual("12345")
        expect(investmentAccount.transactions.length).toEqual(0)
    })

    it("should create checking account", () => {
        expect(checkingAccount.accountNum).toEqual("12345")
        expect(checkingAccount.transactions.length).toEqual(0)
    })

})