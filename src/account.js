const TransactionDate = require("./transactionDate.js");

class Account {
    constructor() {
        this.transactions = [];
        this.balance = 0;
    }

    credit(amount, date) {
        const transactionDate = new TransactionDate();
        this.balance += amount;

        let transaction = {
            date: transactionDate.createDate(),
            amount: amount,
            type: "credit",
            balance: this.balance
        };

        this.transactions.push(transaction);
        return this.transactions;
    }

    debit(amount, date) {
        const transactionDate = new TransactionDate();
        this.balance -= amount;

        let transaction = {
            date: transactionDate.createDate(),

            amount: amount,
            type: "debit",
            balance: this.balance
        };

        this.transactions.push(transaction);
        return this.transactions;
    }
}

module.exports = Account;

const account = new Account();
account.credit(3000);
account.credit(3000);
account.debit(3000);
console.log(account);