class Withdraw {
  constructor(balance, amount, category) {
    this.balance = balance - amount;
    this.date = new Date().toDateString();
    this.type = "withdraw";
    this.amount = amount;
    category ? (this.category = category) : null;
  }
}

module.exports = Withdraw;
