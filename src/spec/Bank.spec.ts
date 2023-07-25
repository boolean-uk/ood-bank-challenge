import { Bank } from "../Bank"

describe("Bank tests", () => {
    let bank:Bank

    beforeEach(()=>{
        bank=new Bank()
    })
    it("should set saving account deposit", () => {
        bank.setSavingAccount(500)
        expect(500).toEqual(bank.getSavingAccount().amount)
    })
    it("should set saving account withdraw", () => {
        bank.setSavingAccount(500)
        bank.setSavingAccount(-300)
        expect(200).toEqual(bank.getSavingAccount().amount)
    })
    it("should set saving account withdraw too much", () => {
        bank.setSavingAccount(500)
        expect(() => bank.setSavingAccount(-700)).toThrow("");
    })
    it("should set current account deposit", () => {
       bank.setCurrentAccount(500)
        expect(500).toEqual(bank.getCurrentAccount().amount)
    })
    it("should set current account withdraw", () => {
       bank.setCurrentAccount(500)
       bank.setCurrentAccount(-300)
        expect(200).toEqual(bank.getCurrentAccount().amount)
    })
    it("should set current account withdraw too much", () => {
       bank.setCurrentAccount(500)
       expect(() => bank.setSavingAccount(-700)).toThrow("");
    })
    it("should make New Transaction", () => {
        bank.setCurrentAccount(500)
        bank.setCurrentAccount(-300)
         expect(200).toEqual(bank.getCurrentAccount().amount)
     })
   
    
})