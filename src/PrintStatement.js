class PrintStatement {
  constructor(card) {
    this.card = card;
  }

  _print() {
    let printStatementArr = this.card.transactions
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
      .map((transaction) => {
        let statementLine = `${transaction.date}  ||`;
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
      .join("");
    const statement = `date             || credit    || debit     || balance
${printStatementArr}
   `;
    return statement;
  }
}

module.exports = PrintStatement;
