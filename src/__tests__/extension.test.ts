import { SavingsAccount } from '../extension/SavingsAccount'
import { CurrentAccount } from '../extension/CurrentAccount'
import { Customer } from '../extension/Customer'
import { InvestmentAccount } from '../extension/InvestmentAccount'
import { TRANSACTION_TYPE } from '../enums/TRANSACTION_TYPE'

describe('AccountTest', () => {
  let customer: Customer
  let current: CurrentAccount
  let investment: InvestmentAccount
  let savings: SavingsAccount

  beforeEach(() => {
    customer = new Customer('John', 'Doe', new Date('1990-01-01'))
    current = new CurrentAccount(customer)
    investment = new InvestmentAccount(customer)
    savings = new SavingsAccount(customer)
  })

  it('should open a current account with a balance of 0', () => {
    expect(current.getBalance()).toEqual(0)
  })

  it('should open a current account with a balance of 1000 calculated from transactions', () => {
    current.deposit(1000)
    expect(current.getBalance()).toEqual(1000)
  })

  it('should throw for insufficient balance', () => {
    current.deposit(5000)
    expect(() => current.withdraw(6000)).toThrow('Insufficient funds')
  })

  it('should allow withdrawal with overdraft', () => {
    current.deposit(500)
    current.requestOverdraft(500)
    current.withdraw(800)
    expect(current.getBalance()).toBe(-300) // Account balance: -300 (500 - 800)
  })

  it('investment account cannot have overdraft', () => {
    investment.deposit(500)
    expect(() => investment.requestOverdraft(500)).toThrow(
      'Investment account cannot request overdraft'
    )
  })

  it('savings account should calculate interest rate', () => {
    investment.createTransaction(
      100,
      TRANSACTION_TYPE.CREDIT,
      new Date('2023-01-01')
    )
    investment.createTransaction(
      50,
      TRANSACTION_TYPE.CREDIT,
      new Date('2020-02-01')
    )
    investment.createTransaction(
      30,
      TRANSACTION_TYPE.DEBIT,
      new Date('2020-02-14')
    )

    investment.accumulateInterest()

    expect(investment.getBalance()).toBeCloseTo(120.1, 1)
  })
})
