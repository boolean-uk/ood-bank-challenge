const Transaction = require('./Transaction')
const Statement = require('./Statement')


class Transactions {
    constructor(balance = 0,) {
        this.balance = balance;
        this.listOfTransactions = [];
    }

    newTransaction(valueOfTransaction) {
        const transaction = new Transaction(valueOfTransaction)
        this.listOfTransactions.push(transaction.handleTransaction())
    }

    printStatement() {
        const statement = new Statement(this.listOfTransactions)
        return statement.printStatement()
    }
}

const testTransactions = new Transactions()
testTransactions.newTransaction('asdj')
console.log(testTransactions.listOfTransactions)

console.log(Math.sign('hasd'))

module.exports = Transactions