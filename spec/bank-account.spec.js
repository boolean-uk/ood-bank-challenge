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
    myBankAccount.deposit(1000)
    myBankAccount.deposit(500)
    myBankAccount.deposit(1000)
    const balance = myBankAccount.getBalance
    expect(balance).toBe('2500.00')
  })

  it('balance should not be under 0', () => {
    const result = myBankAccount.withdraw(1000)
    expect(result).toBe('You dont have enough money!')
  })

  it('balance should be 1000', () => {
    myBankAccount.deposit(2500)
    myBankAccount.withdraw(1500)
    expect(myBankAccount.getBalance).toBe('1000.00')
  })

  it('should lenght of transactions be 5', () => {
    myBankAccount.deposit(1000)
    myBankAccount.deposit(500)
    myBankAccount.deposit(1000)
    myBankAccount.deposit(2500)
    myBankAccount.withdraw(1500)
    const result = myBankAccount.getTransactions
    expect(result.length).toBe(5)
  })

  it('should calculate the deposit ', () => {
    const result = myBankAccount.calculateDepositString('1500.50', '1000.10')
    expect(result).toBe('2500.60')
  })
})