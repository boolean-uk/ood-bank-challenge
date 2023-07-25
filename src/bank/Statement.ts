import BankAccount from "./BankAccount";
import LineItem from "./LineItem";
import Transaction from "./Transaction";

class Statement {
  constructor(private _bankaccount: BankAccount) {}

  print(from?: Date, to?: Date) {
    let transactions: Transaction[] = this._bankaccount.transactions;
    const lineItem: LineItem = new LineItem();
    console.log(
      `${"date".padEnd(11)}|| ${"credit".padEnd(10)}|| ${"debit".padEnd(
        9
      )}|| balance`
    );

    let balance = 0;
    for (const transaction of transactions) {
      balance += transaction.amount;
      if (from !== undefined && to !== undefined) {
        if (transaction.date >= from && transaction.date <= to) {
          console.log(
            lineItem.formatLineItem(
              transaction.date,
              transaction.amount,
              transaction.type
            ) + `|| ${balance.toFixed(2).padEnd(7)}`
          );
        }
      } else {
        console.log(
          lineItem.formatLineItem(
            transaction.date,
            transaction.amount,
            transaction.type
          ) + `|| ${balance.toFixed(2).padEnd(7)}`
        );
      }
    }
  }
}

export default Statement;
