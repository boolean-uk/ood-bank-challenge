class Transaction {
    constructor(date, amount, transactionType) {
        this.date = date;
        this.amount = amount;
        this.transactionType = transactionType; // "credit" or "debit"
    }
}

module.exports = Transaction;
