const Account = require("../src/account.js");

class Bank {
  constructor() {
    this.balance = 2000;
    this.transactions = [];
    this.account = new Account();
  }

  deposit(amount, date) {
    if (!amount || amount <= 0) throw new Error("Amount not valid");
    if (!date) throw new Error("Date not valid");

    const transaction = {
      date: date.replace(/-/g, "/"),
      credit: "   ",
      debit: amount,
      balance: (this.balance += amount),
    };

    this.transactions.push(transaction);

    return `You have deposited £${amount}`;
  }

  withdrawal(amount, date) {
    if (!amount) throw new Error("Amount not valid");
    if (amount > this.balance)
      throw new Error("Amount bigger than current balance");
    if (!date) throw new Error("Date not valid");

    const transaction = {
      date: date.replace(/-/g, "/"),
      credit: amount,
      debit: "  ",
      balance: (this.balance -= amount),
    };

    this.transactions.push(transaction);

    return `You have withdrawed £${amount}`;
  }

  print() {
    return this.account.print(this.transactions);
  }
}

module.exports = Bank;
