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
    expect(() => account.withdraw(19.99)).toThrow()
  })
})
