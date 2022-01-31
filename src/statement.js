class Statement {
    constructor(bankAccount) {
        this.bankAccount = bankAccount
    }

getStatement() {
    let statement =
        `${this.bankAccount.getBalance()}.\nThis is a list of your transactions:\nDate | Amount\n`
        for (let i = 0; i < this.bankAccount.transactionsList.length; i++) {
            statement += `${this.bankAccount.transactionsList[i].date} | ${this.bankAccount.transactionsList[i].amount}\n`
        }
        return statement
    }
}

module.exports = Statement