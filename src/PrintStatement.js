class PrintStatement {
  constructor(card) {
    this.card = card;
    this.formatDate();
  }

  formatDate(currDate) {
    let date = new Date(currDate);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    return day + "/" + month + "/" + year;
  }

  _print() {
    let printStatementArr = this.card.transactions
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
      .map((transaction) => {
        let statementLine = `${this.formatDate(transaction.date)}  ||`;
        statementLine +=
          transaction.type === "withdraw"
            ? ` ${String(transaction.amount.toFixed(2)).padEnd(
                9,
                " "
              )} ||           ||`
            : `           || ${String(transaction.amount.toFixed(2)).padEnd(
                10,
                " "
              )}||`;
        statementLine += ` ${transaction.balance.toFixed(2)}\n`;
        return statementLine;
      })
      .reverse()
      .join("");
    const statement = `date        || credit    || debit     || balance
${printStatementArr}
   `;
    return statement;
  }
}

module.exports = PrintStatement;
