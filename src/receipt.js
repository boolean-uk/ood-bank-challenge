class Receipt {
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

module.exports = Receipt;