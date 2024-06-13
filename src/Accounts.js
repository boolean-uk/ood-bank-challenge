import numeral from "numeral";
import date from "date-and-time";
import { Credit, Debit } from "./Transactions.js";
import { Statement } from "./Statement.js";

class Account {
  #transactions;
  #overdraft;

  constructor(accountHolder, accountNumber) {
    this.accountHolder = accountHolder;
    this.accountNumber = accountNumber;
    this.#overdraft = 0;
    this.#transactions = [];
  }

  credit(amount, testDate) {
    if (this.constructor.name === "SavingsAccount") {
      const today = new Date();
      const oneYearAgo = today - 365 * 24 * 60 * 60 * 1000;
      const totalCreditsThisYear = this.getTransactions(oneYearAgo, today)
        .filter((transaction) => transaction.constructor.name === "Credit")
        .reduce((a, b) => a + Number(b.amount), 0);
      if (totalCreditsThisYear + amount > 20000) {
        throw new Error("You are only able to deposit £20,000 per year");
      }
    }

    const newTransaction = new Credit(
      numeral(amount).format("0.00"),
      this.getDate(testDate)
    );
    this.#transactions.push(newTransaction);
  }

  debit(amount, testDate) {
    if (this.balance - amount < 0 - this.#overdraft) {
      throw new Error("Insufficient funds");
    }
    const newTransaction = new Debit(
      numeral(amount).format("0.00"),
      this.getDate(testDate)
    );
    this.#transactions.push(newTransaction);
  }

  getDate(testDate) {
    if (testDate) {
      const date = new Date(testDate);
      return date;
    }
    const date = new Date();
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
    if (type === "pdf") {
      return thisStatement.getPDF();
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
          transaction.date > new Date(startDate) &&
          transaction.date < new Date(endDate)
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

  get overdraft() {
    return this.#overdraft;
  }

  set overdraft(number) {
    if (this.constructor.name !== "CheckingAccount") {
      throw new Error("Overdrafts are only allowed on checking accounts");
    }
    this.#overdraft = number;
  }
}

class CheckingAccount extends Account {
  constructor(accountHolder, accountNumber) {
    super(accountHolder, accountNumber);
  }
}

class SavingsAccount extends Account {
  constructor(accountHolder, accountNumber) {
    super(accountHolder, accountNumber);
  }
}

class InvestmentAccount extends Account {
  constructor(accountHolder, accountNumber) {
    super(accountHolder, accountNumber);
  }
}

let testAccount = new Account("Will Baxter", "12345678");
  testAccount.credit(10, '2023-9-3');
  testAccount.debit(5, '2023-9-5');
  testAccount.credit(3, '2023-9-7');
  testAccount.credit(23.32, '2023-9-9');
  testAccount.debit(12.01, '2023-9-11');
  testAccount.credit(10, '2023-9-13');
  testAccount.debit(5, '2023-9-15');
  testAccount.credit(3, '2023-9-17');

  testAccount.getStatement('pdf')

export { Account, CheckingAccount, SavingsAccount, InvestmentAccount };
