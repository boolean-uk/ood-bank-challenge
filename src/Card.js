const Deposit = require("./Deposit.js");
const Withdraw = require("./Withdraw.js");

class Card {
  transactions = [];
  balance = 1000;

  constructor(ownerName) {
    this.name = ownerName;
  }

  _deposit(amount) {
    this.checkForInvalidNumber(amount);
    const deposit = new Deposit(this.balance, amount);
    this.balance = deposit.balance;
    this.transactions.push(deposit);
  }

  _withdraw(amount) {
    this.checkForInvalidNumber(amount);
    const deposit = new Withdraw(this.balance, amount);
    this.balance = deposit.balance;
    this.transactions.push(deposit);
  }

  checkForInvalidNumber(number) {
    if (!number || number <= 0) throw new Error("Amount not valid");
  }
}

module.exports = Card;
