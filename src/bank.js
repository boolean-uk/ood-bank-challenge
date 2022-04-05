class Bank {
  constructor() {
    this.transactions = [];
    this.accountBalance = 0;
  }

  deposit(amount, date) {
    //here i check if the amount is valid
    if (!amount || amount <= 0) throw new Error("Amount not valid");
    if (!date) throw new Error("Date not valid");
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
    //check if the amount is valid, return error if the balance would go below 0.
    if (this.accountBalance - amount < 0) {
      return "INSUFFICIENT FUNDS";
    }
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
    return printedStatement;
  }

  // IN THE EXCERCISE I WILL USE HARD CODED DATES

  //   date() {
  //     let dateStamp = new Date()
  //     let date = dateStamp.getDate()
  //     let month = dateStamp.getMonth()
  //     let year = dateStamp.getFullYear()
  //     let today = date + "-" + month + "-" + year
  //     return today
  //   }
}

module.exports = Bank;
