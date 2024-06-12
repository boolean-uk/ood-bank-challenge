class Transaction {
  constructor (amount, date, type, balanceAfterTransaction) {
    this.amount = amount.toFixed(2)
    this.date = date
    this.type = type
    this.balanceAfterTransaction = balanceAfterTransaction.toFixed(2)
  }
}

export { Transaction }