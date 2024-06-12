import { BankAccount } from "../src/bank-account.js"

describe('BankAccount', () => {
  let myBankAccount

  beforeEach(() => {
    myBankAccount = new BankAccount
  })

  it('should be instance of Bank Account', () => {
    expect(myBankAccount).toBeInstanceOf(BankAccount)
  })
})