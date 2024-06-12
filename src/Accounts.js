import numeral from "numeral";
import date from "date-and-time";
import { Credit, Debit } from "./Transactions.js";
import { Statement } from "./Statement.js";

let mockDate = 1;

class Account {
  #transactions;

  constructor(accountHolder, accountNumber) {
    this.accountHolder = accountHolder;
    this.accountNumber = accountNumber;
    this.#transactions = [];
  }

  credit(amount, testDate) {
    const newTransaction = new Credit(
      numeral(amount).format("0.00"),
      this.getDate(testDate)
    );
    this.#transactions.push(newTransaction);
  }

  debit(amount, testDate) {
    if ((this.balance - amount) < 0) {
        throw new Error('Insufficient funds')
    }
    const newTransaction = new Debit(
      numeral(amount).format("0.00"),
      this.getDate(testDate)
    );
    this.#transactions.push(newTransaction);
  }

  getDate(testDate) {
    if (testDate) {
      const date = new Date(`2023-9-${testDate}`);
      return date;
    }
    const date = new Date(`2023-10-${mockDate}`);
    mockDate += 1;
    return date;
  }

  getStatement(type, startDate, endDate) {
    let thisStatement;

    if (startDate && endDate) {
      const statementStartDate = new Date(startDate);
      const statementEndDate = new Date(endDate);

      if (
        isNaN(statementStartDate.getTime()) ||
        isNaN(statementEndDate.getTime())
      ) {
        throw new Error("Date format must be YYYY-MM-DD");
      }

      thisStatement = new Statement(this, statementStartDate, statementEndDate);
    } else {
      thisStatement = new Statement(this);
    }

    if (type === "JSON") {
      return thisStatement.json;
    }
    if (type === "PDF") {
      return thisStatement.pdf;
    }
    if (type === "Console") {
      thisStatement.console;
      return;
    }
    return thisStatement;
  }

  getTransactions(startDate, endDate) {
    const transactionsToSort = [...this.#transactions];

    const transactionsSortedByDate = transactionsToSort.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    let ongoingBalance = 0;

    transactionsSortedByDate.forEach((transaction) => {
      if (transaction.constructor.name === "Debit") {
        transaction.balanceAfterTransaction = numeral(
          ongoingBalance - Number(transaction.amount)
        ).format("0.00");
        ongoingBalance -= Number(transaction.amount);
      }
      if (transaction.constructor.name === "Credit") {
        transaction.balanceAfterTransaction = numeral(
          ongoingBalance + Number(transaction.amount)
        ).format("0.00");
        ongoingBalance += Number(transaction.amount);
      }
    });

    if (startDate && endDate) {
      const transactionsWithinPeriod = transactionsSortedByDate.filter(
        (transaction) =>
          transaction.date > startDate && transaction.date < endDate
      );
      return transactionsWithinPeriod;
    }

    return transactionsSortedByDate;
  }

  get balance() {
    const totalCredit = this.credits.reduce((a, b) => a + Number(b.amount), 0);
    const totalDebit = this.debits.reduce((a, b) => a + Number(b.amount), 0);

    return totalCredit - totalDebit;
  }

  get credits() {
    const filteredTransactions = this.#transactions.filter(
      (transaction) => transaction.constructor.name === "Credit"
    );
    return [...filteredTransactions];
  }

  get debits() {
    const filteredTransactions = this.#transactions.filter(
      (transaction) => transaction.constructor.name === "Debit"
    );
    return [...filteredTransactions];
  }
}

export { Account };
