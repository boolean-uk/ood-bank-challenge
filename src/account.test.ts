import { Account } from "./account"

describe("Account tests", () => {
    let account: Account

    beforeEach(() => { 
        account = new Account()
    })

    it("should return 0 when calculateBalance is called on an empty account", () => {
        const result = account.calculateBalance()
        expect(result).toEqual(0)
    })

    it("should increase balance when money is deposited", () => {
        account.depositMoney(10)
        
        const result = account.calculateBalance()
        expect(result).toEqual(10)
    })

    it("should decrease balance when money is withdrawn", () => {
        account.depositMoney(10)

        account.withdrawMoney(5)

        const result = account.calculateBalance()
        expect(result).toEqual(10-5)
    })

    it("should not decrease balance when asked to withdraw more than current account balance when no overdraft", () => {
        account.depositMoney(10)

        account.withdrawMoney(20)

        const result = account.calculateBalance()
        expect(result).toEqual(10)
    })

    it("should decrease balance when asked to withdraw more than current account balance when account has overdraft", () => {
        account.depositMoney(10)
        account.addOverdraft()

        account.withdrawMoney(20)

        const result = account.calculateBalance()
        expect(result).toEqual(-10)
    })

    it("should not decrease balance when asked to withdraw more than current account balance + overdraft when account has overdraft", () => {
        account.depositMoney(10)
        account.addOverdraft()

        account.withdrawMoney(520)

        const result = account.calculateBalance()
        expect(result).toEqual(10)
    })

})