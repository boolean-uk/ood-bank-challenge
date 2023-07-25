import {
  SavingsAccount
} from '../src/savings_account'
import {
  type Account
} from '../src/account'

describe('SavingsAccount', function () {
  let account: Account

  beforeEach(() => {
    account = new SavingsAccount()
  })

  it('deposit adds transaction', function () {
    account.deposit(19.99)
    account.deposit(19.99)

    expect(account.getBalance()).toEqual(39.98)
  })

  it('deposit throws exception for negative amount', function () {
    expect(() => { account.deposit(-20) }).toThrow()
  })

  it('withdraw adds transaction', function () {
    account.deposit(19.99)
    account.deposit(19.99)

    account.withdraw(19.99)

    expect(account.getBalance()).toEqual(19.99)
  })

  it('withdraw throws exception when balance is insufficient', function () {
    expect(() => { account.withdraw(19.99) }).toThrow()
  })

  it('withdraw throws exception for negative amount', function () {
    expect(() => { account.withdraw(-10) }).toThrow()
  })

  it('generateStatement returns statement', function () {
    const date: string = Date()
    account.deposit(19.99)
    account.deposit(19.99)
    account.withdraw(19.99)

    expect(() => { account.generateStatement() }).toEqual(`
    date || credit || debit || balance
    ${date} ||        || 19.99  || 19.99
    ${date} || 19.99  ||        || 39.98
    ${date} || 19.99  ||        || 19.99
    `)
  })
})
