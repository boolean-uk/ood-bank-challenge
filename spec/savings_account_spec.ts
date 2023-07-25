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

  it('deposit does not allow to deposit more than 20,000 per year', function () {
    account.deposit(20000);
    expect(() => account.deposit(1)).toThrow();
  });

  it('withdraw throws exception when balance is insufficient', function () {
    expect(() => { account.withdraw(19.99) }).toThrow()
  })

  it('withdraw throws exception for negative amount', function () {
    expect(() => { account.withdraw(-10) }).toThrow()
  })

  it('generateStatement returns statement', function () {
    const date: Date = new Date()
    const formattedDate: string = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()

    account.deposit(19.99)
    account.deposit(19.99)
    account.withdraw(19.99)

    expect(account.generateStatement()).toEqual('date || credit || debit || balance\n' +
      `${formattedDate} || || 19.99 || 19.99\n` +
      `${formattedDate} || 19.99 || || 39.98\n` +
      `${formattedDate} || 19.99 || || 19.99\n`
        .trim())
  })
})
