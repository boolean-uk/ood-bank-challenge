import { BankAccount } from "../src/bank-account.js"
describe('BankAccount', () => {
  let myBankAccount

  beforeEach(() => {
    myBankAccount = new BankAccount
  })

  it('should be instance of Bank Account', () => {
    expect(myBankAccount).toBeInstanceOf(BankAccount)
  })

  it('should balance be 2500', () => {
    myBankAccount.deposit(1000, '10-01-2012')
    myBankAccount.deposit(500, '11-01-2012')
    myBankAccount.deposit(1000, '12-01-2012')
    const balance = myBankAccount.getBalance
    expect(balance).toBe(2500)
  })

  it('balance should not be under 0', () => {
    const result = myBankAccount.withdraw(1000, '10-01-2012')
    expect(result).toBe('You dont have enough money!')
  })

  it('balance should be 1000', () => {
    myBankAccount.deposit(2500, '10-01-2012')
    myBankAccount.withdraw(1500, '10-01-2012')
    expect(myBankAccount.getBalance).toBe(1000)
  })

  it('should lenght of transactions be 5', () => {
    myBankAccount.deposit(1000, '10-01-2012')
    myBankAccount.deposit(500, '11-01-2012')
    myBankAccount.deposit(1000, '12-01-2012')
    myBankAccount.deposit(2500, '12-01-2012')
    myBankAccount.withdraw(1500, '13-01-2012')
    const result = myBankAccount.getTransactions
    expect(result.length).toBe(5)
  })


})