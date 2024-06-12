import { BankAccount } from "../bankAccount"


describe('BankAccount', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = new BankAccount()
  })

  it('should record a deposit transaction and update balance correctly', () => {
    bankAccount.deposit(1000, new Date('2012-01-10'))
    expect(bankAccount.calculateBalance()).toBe(1000)
  })

  it('should record a withdrawal transaction and update balance correctly', () => {
    bankAccount.deposit(1000, new Date('2012-01-10'))
    bankAccount.withdraw(500, new Date('2012-01-14'))
    expect(bankAccount.calculateBalance()).toBe(500)
  });

  it('should print the bank statement correctly', () => {
    bankAccount.deposit(1000, new Date('2012-01-10'))
    bankAccount.deposit(2000, new Date('2012-01-13'))
    bankAccount.withdraw(500, new Date('2012-01-14'))
  
    const expectedStatement =
      "date       || credit  || debit  || balance\n" +
      "14/01/2012 ||         || 500.00 || 2500.00\n" +
      "13/01/2012 || 2000.00 ||        || 3000.00\n" +
      "10/01/2012 || 1000.00 ||        || 1000.00\n"
  
    const consoleSpy = jest.spyOn(console, 'log')
    bankAccount.printStatement()
    const receivedOutput = consoleSpy.mock.calls.join('\n') + '\n'
  
    expect(receivedOutput).toMatch(new RegExp(expectedStatement))
  })
})
