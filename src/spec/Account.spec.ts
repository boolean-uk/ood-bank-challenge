import { SavingAccount } from "../SavingAccount"

describe('Account Test', () => {
    it("should deposit saving", () => {
        let account=new SavingAccount(0)
        account.deposit(800)
        expect(800).toEqual(account.amount)
    })
    it("should deposit current", () => {
        let account=new SavingAccount(0)
        account.deposit(800)
        expect(800).toEqual(account.amount)
    })
    it("should withdaw current", () => {
        let account=new SavingAccount(0)
        account.deposit(800)
        expect(800).toEqual(account.amount)
    })
   
    
    it("should withdraw saving", () => {
        let account=new SavingAccount(0)
        account.deposit(800)
        expect(800).toEqual(account.amount)
    })
})