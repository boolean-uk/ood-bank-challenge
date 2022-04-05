const TransactionDate = require("./transactionDate.js");

class Account {
    constructor() {
        this.transactions = [];
        this.balance = 0;
    }

    credit(amount) {
        if (amount === 0 || amount === NaN) {
            throw new Error("Enter valid amount");
        }
        const transactionDate = new TransactionDate();
        this.balance += amount;

        let transaction = {
            date: transactionDate.createDate(),
            type: "credit",
            amount: amount,
            balance: this.balance
        };

        this.transactions.push(transaction);
        return this.transactions;
    }

    debit(amount) {
        if (amount === 0 || amount === NaN) {
            throw new Error("Enter valid amount");
        }
        if (amount > this.balance) {
            throw new Error("Cannot withdraw more than you have");
        }
        const transactionDate = new TransactionDate();
        this.balance -= amount;

        let transaction = {
            date: transactionDate.createDate(),
            type: "debit",
            amount: amount,
            balance: this.balance
        };

        this.transactions.push(transaction);
        return this.transactions;
    }

    receipt() {
        let heading = `||     date       ||  credit  || debit  || balance  ||`;
        let line = `------------------------------------------------------`;

        let statementLinesToPrint = [heading, line];
        this.transactions.forEach((object) => {
            let date = object.date;
            let balance = object.balance;
            let debitAmount = ``;
            let creditAmount = ``;

            if (object.type === "credit") {
                creditAmount = object.amount;
                debitAmount = ``;
            }

            if (object.type === "debit") {
                creditAmount = ``;
                debitAmount = object.amount;
            }

            const columnCharLength = 4;

            while (debitAmount.length < columnCharLength) {
                debitAmount = ` ` + debitAmount;
            }

            while (creditAmount.length < columnCharLength) {
                creditAmount = ` ` + creditAmount;
            }

            const rowInReceipt = `   ${date}  ||  ${creditAmount}    ||  ${debitAmount}  ||  ${balance}    ||`;
            statementLinesToPrint.push(rowInReceipt);
        });

        return statementLinesToPrint;
    }
}

module.exports = Account;

const account = new Account();
account.credit(3000);
account.credit(3000);
account.debit(3000);
const arrayToPrint = account.receipt();

for (let item of arrayToPrint) {
    console.log(item);
}