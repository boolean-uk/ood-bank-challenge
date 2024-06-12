const BankAccount = require('./BankAccount');
const Transaction = require('./Transaction');

class InvestmentAccount extends BankAccount {
    constructor() {
        super();
    }

    addMonthlyInterest() {
        const interest = this.getBalance() * 0.02;
        this.transactions.push(new Transaction(new Date().toISOString().split('T')[0], interest, "credit"));
    }
}

module.exports = InvestmentAccount;
