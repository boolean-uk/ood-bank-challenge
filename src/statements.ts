import { Decimal } from "decimal.js";
import { Account } from "./account";

export class Statement {
  constructor(private account: Account) {}

  get printout() {
    let printout = "date       || credit || debit || balance\n";
    printout = printout.replace("credit", "credit".padEnd(7, " "));
    printout = printout.replace("debit", "debit".padEnd(7, " "));
    printout = printout.replace("balance", "balance".padEnd(7, " "));

    for (const row of this.generateTransactionRows()) {
      printout += row;
    }
    return printout;
  }

  generateTransactionRows() {
    let balance: Decimal = new Decimal(0);
    let rows: string[] = [];
    for (const transaction of this.account.transactions) {
      let amount = transaction.amount;
      let date = this.formatDate(transaction.date);
      let credit = amount.greaterThan(0) ? amount.toFixed(2) : "";
      let debit = amount.lessThan(0) ? amount.times(-1).toFixed(2) : "";
      balance = balance.plus(transaction.amount);
      credit = credit.padStart(7, " ");
      debit = debit.padStart(7, " ");
      const balanceString = balance.toFixed(2).padStart(7, " ");

      rows.unshift(`${date} || ${credit} || ${debit} || ${balanceString}\n`);
    }
    return rows;
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${day}/${month}/${year}`;
  }
}
