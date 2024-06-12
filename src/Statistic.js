var Pie = require("cli-pie");

class Statistic {
  calcTotalDebitOrCredit(card, type) {
    return card.transactions
      .map((transaction) => {
        if (transaction.type === type) return transaction.amount;
        return null;
      })
      .filter((num) => num > 0)
      .reduce((sum, transaction) => sum + transaction);
  }

  chart(card) {
    console.log("CARD", card);
    const totalCredit = this.calcTotalDebitOrCredit(card, "withdraw");
    const totalDebit = this.calcTotalDebitOrCredit(card, "deposit");
    const total = totalCredit + totalDebit;
    const percent = total / 100;
    const value1 = totalCredit / percent;
    const value2 = totalDebit / percent;
    // Generate a new pie, with radius 5 characters
    let chart = new Pie(
      5,
      [
        { label: "Deposit", value: value2, color: [0, 255, 0] },
        { label: "Withdrawal", value: value1, color: [255, 0, 0] },
      ],
      {
        legend: true,
        total_label: total,
      }
    );
    // Stringify
    console.log(chart.toString());
  }
}

module.exports = Statistic;
