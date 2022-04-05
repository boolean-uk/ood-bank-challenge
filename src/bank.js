class Bank {
  constructor() {
    this.transactions = [];
    this.accountBalance = 0;
  }

  deposit(amount, date) {
    //first i update the account balance
    this.accountBalance += amount;
    //then i create the new transaction
    let newTransaction = {
      date: date,
      amount: amount,
      type: "credit",
      balance: this.accountBalance,
    };
    //then i push the new transaction to the array.
    this.transactions.push(newTransaction);
  }

  withdraw(amount, date) {
    //first i update the account balance
    this.accountBalance -= amount;
    //then i create the new transaction
    let newTransaction = {
      date: date,
      amount: amount,
      type: "debit",
      balance: this.accountBalance,
    };
    //then i push the new transaction to the array.
    this.transactions.push(newTransaction);
  }

  statement() {
    console.log(
      "TRANSACTIONS: ",
      this.transactions,
      "BALANCE: ",
      this.accountBalance
    );
    //printedStatement will bring together all the transactions lines
    let printedStatement = "date  ||  credit  ||  debit  ||  balance";
    //i loop through the array of transactions for each transaction, take the info i need and create the printed statement in a form of a string.
    for (let i = 0; i < this.transactions.length; i++) {
      let currentTr = this.transactions[i];
      let date = currentTr.date;
      let amount = currentTr.amount;
      let type = currentTr.type;
      let balance = currentTr.balance;
      printedStatement +=
        "\n" + date + "  ||  " + amount + "  ||  " + type + "  ||  " + balance;
    }
    console.log("PRINTED STATEMENT: ", printedStatement);
    return printedStatement;
  }

  date() {}
}

module.exports = Bank;
