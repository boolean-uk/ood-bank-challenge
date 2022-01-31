const BankAccount = require('./bank-account.js')

class Statement {
    constructor(bankAccount) {
        this.bankAccount = bankAccount
    }

getStatement() {
    let statement =
        `Your current available balance is £${this.bankAccount.availableBalance}.\nThis is a list of your transactions:\n`
        for (let i = 0; i < this.bankAccount.transactionsList.length; i++) {
            statement += this.bankAccount.transactionsList[i].date + ', ' + this.bankAccount.transactionsList[i].amount
        }
        return statement
    }
}

module.exports = Statement