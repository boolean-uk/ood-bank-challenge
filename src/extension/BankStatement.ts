import { TRANSACTION_TYPE } from "../enums/TRANSACTION_TYPE";
import { Transaction } from "./Transaction";

export class BankStatement {
  public static generateBankStatement(transactions: Transaction[]): String {
    let statement = "";
    statement += this.printHeading();

    let balance = 0;

    for (const transaction of transactions) {
      balance = this.calcBalance(transaction, balance);
      statement += this.printTransactionStatement(transaction, balance);
    }
    return statement;
  }

  public static printTransactionStatement(
    transaction: Transaction,
    balance: number
  ): String {
    const dtf = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const date = transaction.getDate();
    const formattedDate = dtf.format(date);
    const credit =
      transaction.getType() === TRANSACTION_TYPE.CREDIT
        ? transaction.getAmount().toString()
        : "";
    const debit =
      transaction.getType() === TRANSACTION_TYPE.DEBIT
        ? transaction.getAmount().toString()
        : "";
    const statementBalance = balance.toFixed(2);

    return `${formattedDate.padEnd(10)} || ${credit.padEnd(
      10
    )} || ${debit.padEnd(10)} || ${statementBalance.padEnd(10)}\n`;
  }

  public static generateBankStatementBetweenDates(
    transactions: Transaction[],
    startDate: Date,
    endDate: Date
  ) {
    let filteredTransctions: Transaction[] = transactions.filter(
      (transaction) =>
        transaction.getDate() >= startDate && transaction.getDate() <= endDate
    );
    return this.generateBankStatement(filteredTransctions);
  }

  static calcBalance(transaction: Transaction, balance: number): number {
    return transaction.getType() === TRANSACTION_TYPE.CREDIT
      ? balance + transaction.getAmount()
      : balance - transaction.getAmount();
  }

  static printHeading(): String {
    return `${"date".padEnd(10)} || ${"credit".padEnd(10)} || ${"debit".padEnd(
      10
    )} || ${"balance".padEnd(10)}\n`;
  }
}
