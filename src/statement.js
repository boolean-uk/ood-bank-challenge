class Statement {
  constructor(transactions) {
    this.transactions = transactions;
  }

  print() {
    const statementLines = [];
    for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i];
      if (transaction.type === "credit") {
        const line = `${transaction.date.replace(
          /-/g,
          "/"
        )} || ${transaction.amount.toFixed(
          2
        )} || || ${transaction.balance.toFixed(2)}`;
        statementLines.push(line);
      } else {
        const line = `${transaction.date.replace(
          /-/g,
          "/"
        )} || || ${transaction.amount.toFixed(
          2
        )} || ${transaction.balance.toFixed(2)}`;
        statementLines.push(line);
      }
    }
    const reversedStatementLines = statementLines.reverse();

    reversedStatementLines.unshift("date || credit || debit || balance");
    return statementLines.join("\n");
  }
}

module.exports = Statement;
