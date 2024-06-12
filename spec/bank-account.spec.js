import { BankAccount } from "../src/bank-account.js"
import { Transaction } from "../src/transaction.js"
describe('BankAccount', () => {
  let myBankAccount

  beforeEach(() => {
    myBankAccount = new BankAccount
  })

  it('should be instance of Bank Account', () => {
    expect(myBankAccount).toBeInstanceOf(BankAccount)
  })

  it('should balance be 2500', () => {
    myBankAccount.deposit(1000, '10-01-2012', 'debit')
    myBankAccount.deposit(500, '11-01-2012', 'debit')
    myBankAccount.deposit(1000, '12-01-2012', 'debit')
    const balance = myBankAccount.getBalance
    expect(balance).toBe(2500)
  })
})