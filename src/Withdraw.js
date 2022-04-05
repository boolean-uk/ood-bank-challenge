class Withdraw {
  constructor(balance, amount) {
    this.balance = balance - amount;
    this.date = new Date().toDateString();
    this.type = "withdraw";
    this.amount = amount;
  }
}

module.exports = Withdraw;
