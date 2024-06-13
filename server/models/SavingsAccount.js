const BankAccount = require('./BankAccount');

class SavingsAccount extends BankAccount {
    constructor() {
        super();
        this.depositLimit = 20000;
    }

    deposit(amount, date) {
        const totalDepositsThisYear = this.transactions
            .filter(transaction => transaction.transactionType === "credit" && new Date(transaction.date).getFullYear() === new Date(date).getFullYear())
            .reduce((sum, transaction) => sum + transaction.amount, 0);
        if (totalDepositsThisYear + amount > this.depositLimit) {
            throw new Error("Deposit limit exceeded for the year");
        }
        super.deposit(amount, date);
    }
}

module.exports = SavingsAccount;
