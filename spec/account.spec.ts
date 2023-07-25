import { Account, CheckingAccount, InvestmentAccount, OverdraftAccount, SavingAccount } from "../src/account"

describe("Basic account operations", () => {

    let account: Account

    beforeEach(() => {
        account = new CheckingAccount("1234")
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

describe("Bank operations with overdraft", () => {
    let account: OverdraftAccount

    beforeEach(() => {
        account = new SavingAccount("1234")
    })

    it("should throw an error when withdrawing from empty account without overdraft", () => {
        expect(() => account.withdraw(10000, new Date())).toThrow("You don't have that much money.")
    })

    it("should return negative balance", () => {
        account.setOverdraft({ amount: 50000 })
        account.withdraw(10000, new Date())
        expect(account.getBalance()).toEqual(-10000)
    })

    it("should throw when withdrawing more than overdraft allows", () => {
        account.setOverdraft({ amount: 50000 })
        expect(() => account.withdraw(50001, new Date())).toThrow("You don't have that much money.")
    })
})

describe("Investment account", () => {
    let account: InvestmentAccount

    beforeEach(() => {
        account = new InvestmentAccount("1234", 2)
    })

    it("should return interests and add them to balance as transaction", () => {
        account.deposit(200000, new Date())
        const interests = account.calculateInterests()
        expect(interests).toEqual(4000)
        expect(account.getBalance()).toEqual(204000)
        expect(account.getTransactions().length).toEqual(2)
    })
})