const Bank = require("../src/Bank.js")

describe("Bank", () => {
  describe("#printStatement()", () => {
    it("returns printed statement", () => {
      const firstRowOfStatement = 'date       || credit  || debit  || balance'

      expect(Bank.printStatement()[0]).toEqual(firstRowOfStatement)
    })
  })

  describe("#transaction()", () => {
    it("increases amount of money on account by 1000", () => {
      const referedBalance = 1000
      expect(Bank.transaction(1000,true)).toEqual(referedBalance)
    })
  })

  describe("#transaction()", () => {
    it("increases amount of money on account by 2000", () => {
        const referedBalance = 2000
        expect(Bank.transaction(2000,true)).toEqual(referedBalance)
    })
  })

  describe("#transaction()", () => {
    it("decreases amount of money on account by 500", () => {
        const referedBalance = 2500
        Bank.transaction(1000, true)
        Bank.transaction(2000, true)

        expect(Bank.transaction(500,false)).toEqual(referedBalance)
    })
  })
})