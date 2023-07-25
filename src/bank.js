const Statement = require("../src/statement.js");

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
    const statement = new Statement(this.transactions);
    return statement.print();
  }

  //   const statementLines = [];
  //   for (let i = 0; i < this.transactions.length; i++) {
  //     const transaction = this.transactions[i];
  //     if (transaction.type === "credit") {
  //       const line = `${transaction.date.replace(
  //         /-/g,
  //         "/"
  //       )} || ${transaction.amount.toFixed(
  //         2
  //       )} || || ${transaction.balance.toFixed(2)}`;
  //       statementLines.push(line);
  //     } else {
  //       const line = `${transaction.date.replace(
  //         /-/g,
  //         "/"
  //       )} || || ${transaction.amount.toFixed(
  //         2
  //       )} || ${transaction.balance.toFixed(2)}`;
  //       statementLines.push(line);
  //     }
  //   }
  //   const reversedStatementLines = statementLines.reverse();

  //   reversedStatementLines.unshift("date || credit || debit || balance");
  //   return statementLines.join("\n");
  // }
}

module.exports = Bank;

// Get the current transaction object which equals this.transactions[i]
// Convert properties of transaction into a single string
// add the generated string from transaction to statementOfTransactions
