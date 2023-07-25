import Account from '@model/Account'
import User from '@model/User'
import TransactionStatus from '@model/TransactionStatus'
import TransactionType from '@model/TransactionType'

const INTEREST_RATE = .02

class InvestmentAccount extends Account {
  constructor(owner: User) {
    super(owner)
  }

  get balance(): number {
    const amountsGroupedByYear = this.transactions
    .filter(t => t.status === TransactionStatus.Values.Accepted)
    .reduce((m, t) => {
      const year = t.date.getFullYear()
      const sum = m.get(year) || 0
      m.set(year, sum + t.amount)
      return m
    }, new Map<number, number>())
    .values()

    return [...amountsGroupedByYear]
      .reduce((sum, amount) => (sum + amount) * (1 + INTEREST_RATE), 0)
  }
}

export default InvestmentAccount