const Transaction = require("../src/tx.js");

class bankAccount {
  constructor() {
    this.transactionsArray = [];
    this.balance = 0;
  }

  checkBalance() {
    return this.balance;
  }
}

module.exports = bankAccount;
