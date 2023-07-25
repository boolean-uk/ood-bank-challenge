import { CheckingAccount } from "../src/accountTypes/CheckingAccount";
import { InvestmentAccount } from "../src/accountTypes/InvestmentAccount";
import { SavingAccount } from "../src/accountTypes/SavingAccount";

describe("Account Types tests", () => {
    let savingAccount: SavingAccount
    let investmentAccount: InvestmentAccount
    let checkingAccount: CheckingAccount

    beforeEach(() => {
        savingAccount = new SavingAccount("12345")
        investmentAccount = new InvestmentAccount("123456")
        checkingAccount = new CheckingAccount("23456")
    })

    it("should create savings account", () => {
        expect(savingAccount.accountNum).toEqual("12345")
        expect(savingAccount.transactions.length).toEqual(0)
    })

    it("should create investment account", () => {
        expect(investmentAccount.accountNum).toEqual("123456")
        expect(investmentAccount.transactions.length).toEqual(0)
    })

    it("should create checking account", () => {
        expect(checkingAccount.accountNum).toEqual("23456")
        expect(checkingAccount.transactions.length).toEqual(0)
    })

})