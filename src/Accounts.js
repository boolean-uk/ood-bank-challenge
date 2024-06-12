import numeral from "numeral";
import { Credit, Debit } from "./Transactions.js";

class Account {
  #transactions;

  constructor(accountHolder, accountNumber, transactions = []) {
    this.accountHolder = accountHolder;
    this.accountNumber = accountNumber;
    this.#transactions = transactions;
  }

  credit(amount) {
    const newTransaction = new Credit(
      numeral(amount).format("0.00"),
      this.getDate(),
      this.balance + amount
    );
    this.#transactions.push(newTransaction);
  }

  debit(amount) {
    const newTransaction = new Debit(
      numeral(amount).format("0.00"),
      this.getDate(),
      this.balance - amount
    );
    this.#transactions.push(newTransaction);
  }

  getDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  }

  getStatement(type) {
    const statement = new Statement(this);

    if (type === "JSON") {
      return statement.json;
    }
    if (type === "PDF") {
      return statement.pdf;
    }
    return statement
  }

  getTransactions(startDate, endDate) {
    return [...this.#transactions];
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

class Statement {
  constructor(account) {
    this.accountInfo = {
      accountHolder: account.accountHolder,
      accountNumber: account.accountNumber,
    };
    this.transactions = account.transactions;
    this.closingBalance = numeral(account.balance).format("0.00")
  }
}


export { Account };
