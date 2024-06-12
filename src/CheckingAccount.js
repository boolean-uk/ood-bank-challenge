const BankAccount = require('./BankAccount');

class CheckingAccount extends BankAccount {
    constructor() {
        super();
    }

    setOverdraftLimit(limit) {
        super.setOverdraftLimit(limit);
    }
}

module.exports = CheckingAccount;
