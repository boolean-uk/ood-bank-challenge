class Lines {
    constructor(transactions) {
        this.transactions = transactions;
    }

    linesToPrint() {
        let statementLinesToPrint = [];

        this.transactions.forEach((object) => {
            let date = object.date;
            let balance = object.balance.toFixed(2);
            let debitAmount = ``;
            let creditAmount = ``;

            if (object.type === "credit") {
                creditAmount = object.amount.toFixed(2);
                debitAmount = ``;
            }

            if (object.type === "debit") {
                creditAmount = ``;
                debitAmount = object.amount.toFixed(2);
            }

            const columnCharLength = 4;

            while (debitAmount.length < columnCharLength) {
                debitAmount = ` ` + debitAmount;
            }

            while (creditAmount.length < columnCharLength) {
                creditAmount = ` ` + creditAmount;
            }

            const rowInReceipt = `||   ${date}  ||  ${creditAmount}    ||  ${debitAmount}  ||  ${balance}    ||`;
            statementLinesToPrint.push(rowInReceipt);
        });

        statementLinesToPrint.reverse();
        console.log("statementLinesToPrint", statementLinesToPrint);
        return statementLinesToPrint;
    }
}

module.exports = Lines;