class Deposit {
  constructor(balance, amount) {
    this.balance = balance + amount;
    this.date = new Date().toDateString();
    this.type = "deposit";
    this.amount = amount;
  }
}

module.exports = Deposit;
