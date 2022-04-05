class Bank {
  constructor() {
    this.transactions = [];
    this.balance = 0;
  }

  deposit(amount, date) {
    this.balance += amount;

    const transaction = {
      amount: amount,
      date: date,
      balance: this.balance,
      type: "credit",
    };
    this.transactions.push(transaction);
  }

  withdraw(amount, date) {
    this.balance -= amount;

    const transaction = {
      amount: amount,
      date: date,
      balance: this.balance,
      type: "debit",
    };
    this.transactions.push(transaction);
  }

  printStatement() {
    let statementOfTransactions = "";
    for (let i = 0; i < this.transactions.length; i++) {
      // Get the current transaction object which equals this.transactions[i]
      // Convert properties of transaction into a single string
      // add the generated string from transaction to statementOfTransactions
    }
    return statementOfTransactions;
  }
}

module.exports = Bank;
