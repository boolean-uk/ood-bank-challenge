const StatementLine = require("./StatementLine.js");
const Withdraw = require("./Withdraw.js");

class PrintStatement {
  constructor(card) {
    this.card = card;
    this.formatDate();
  }
  _print() {
    let printStatementArr = this.card.transactions
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
      .map((transaction) => {
        const newLine = new StatementLine();
        return newLine._printLine(transaction);
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
