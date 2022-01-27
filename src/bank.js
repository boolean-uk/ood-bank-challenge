const Account = require('./account.js')

class Bank {
    constructor() {
        this.accountID = 0
    }

    accountIDGenerator() {
        this.accountID++
    }

    openAccount() {
        this.accountIDGenerator()
        return new Account(this.accountID)
    }
}

module.exports = Bank