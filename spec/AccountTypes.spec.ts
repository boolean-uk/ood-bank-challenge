import { Account } from "../src/Account"

describe("Account Types tests", () => {
    let savingAccount: SavingAccount;

    beforeEach(() => {
        savingAccount = new SavingAccount("12345")
    })

    it("should create savings account", () => {
        expect(savingAccount.accountNum).toEqual("12345")
        expect(savingAccount.transactions.length).toEqual(0)
    })

})