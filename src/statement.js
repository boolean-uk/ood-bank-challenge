class Statement {
    constructor(bankAccount) {
        this.bankAccount = bankAccount
    }

    getStatement() {
    let statement =
        `${this.bankAccount.getBalance()}.\nThis is a list of your transactions:\n   Date    | Amount | Balance\n`
        for (const transaction of this.bankAccount.transactionsList) {
            statement += `${transaction.date} | ${transaction.amount} | ${transaction.balance}\n`
        }
        return statement
    }
}

module.exports = Statement
