import { TRANSACTION_TYPE } from '../enums/TRANSACTION_TYPE'
import { Account } from './Account'
import { Customer } from './Customer'

export class InvestmentAccount extends Account {
  private _interestRate: number = 2
  private _lastInterestAccumulation: Date = new Date()

  constructor(customer: Customer) {
    super(customer)
  }

  override requestOverdraft(amount: number): void {
    throw new Error('Investment account cannot request overdraft')
  }

  accumulateInterest(): void {
    this._lastInterestAccumulation = this._transactions[0].getDate()
    const currentDate = new Date()
    const elapsedTimeInMonths = this.calculateElapsedMonths(
      this._lastInterestAccumulation,
      currentDate
    )
    const balanceWithInterest =
      this.calculateBalanceWithInterest(elapsedTimeInMonths)
    const interestAmount = balanceWithInterest - this.getBalance()
    this.createTransaction(interestAmount, TRANSACTION_TYPE.CREDIT, new Date())
    this._lastInterestAccumulation = currentDate
  }

  getBalance(): number {
    return super.getBalance()
  }

  getInterestRate(): number {
    return this._interestRate
  }

  calculateElapsedMonths(startDate: Date, endDate: Date): number {
    const elapsedMilliseconds = endDate.getTime() - startDate.getTime()
    const elapsedMonths = elapsedMilliseconds / (1000 * 60 * 60 * 24 * 30)
    return elapsedMonths
  }

  //   A = P * (1 + r/n)^(n*t)

  //   Where:
  // A = the future value of the investment/loan, including interest
  // P = the principal investment amount (initial balance)
  // r = the annual interest rate (in decimal form)
  // n = the number of times that interest is compounded per year (monthly, so n = 12)
  // t = the number of years the money is invested or borrowed for (in this case, 1/12 years for one month)

  calculateBalanceWithInterest(elapsedMonths: number): number {
    const balance = super.getBalance()
    const monthlyInterestRate = this._interestRate / 100 / 12
    const interestFactor = Math.pow(
      1 + monthlyInterestRate,
      (elapsedMonths * 1) / 12
    )
    const balanceWithInterest = balance * interestFactor
    return balanceWithInterest
  }
}
