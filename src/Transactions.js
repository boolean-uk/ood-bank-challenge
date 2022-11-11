const Transaction = require("./Transaction");
const Statement = require("./Statement");

class Transactions {
  constructor(balance = 0) {
    this.balance = balance;
    this.listOfTransactions = [];
  }

  newTransaction(valueOfTransaction) {
    const transaction = new Transaction(valueOfTransaction, this.balance);
    const completedTransaction = transaction.handleTransaction();
    this.listOfTransactions.push(completedTransaction);
    // updateBalance()
    this.balance = this.balance + valueOfTransaction;
  }

  printStatement() {
// date       || credit  || debit  || balance
// 14/01/2012 ||         || 500.00 || 2500.00
// 13/01/2012 || 2000.00 ||        || 3000.00
// 10/01/2012 || 1000.00 ||        || 1000.00


    const statement = new Statement(this.listOfTransactions)
    return statement.printStatement()
//     return (
// `date       || credit  || debit  || balance
// 14/01/2012 ||         || 500.00 || 2500.00
// 13/01/2012 || 2000.00 ||        || 3000.00
// 10/01/2012 || 1000.00 ||        || 1000.00`
//         )
  }
}

const testTransactions = new Transactions();
testTransactions.newTransaction(-500);
testTransactions.newTransaction(200);
// testTransactions.newTransaction(2000);
// testTransactions.newTransaction(-9999);
testTransactions.printStatement()

module.exports = Transactions;
