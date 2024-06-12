class Transaction {
  constructor (amount, date, type,balanceAfterTransaction) {
    this.amount = amount
    this.date = date
    this.type = type
    this.balanceAfterTransaction = balanceAfterTransaction
  }
}

export { Transaction }