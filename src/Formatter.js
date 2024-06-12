var fs = require("fs");
const Statistic = require("./Statistic.js");

class Formatter {
  CSV(card) {
    let csvContent = card.name + "," + "";

    card.transactions.forEach(function (transaction) {
      console.log(transaction);
      csvContent += transaction.category
        ? transaction.category
        : "" + "," + transaction.type + "," + transaction.amount + ",";
    });

    fs.writeFile(`bankStatement${card.name}.csv`, csvContent, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  }

  chart(card) {
    const bankStat = new Statistic(card);
    bankStat.chart(card);
    return bankStat;
  }
}

module.exports = Formatter;
