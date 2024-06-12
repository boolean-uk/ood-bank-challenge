import numeral from "numeral";
import date from 'date-and-time'
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
    );
    this.#transactions.push(newTransaction);
  }

  debit(amount) {
    const newTransaction = new Debit(
      numeral(amount).format("0.00"),
      this.getDate(),
    );
    this.#transactions.push(newTransaction);
  }

  getDate() {
    const date = new Date();

    return date
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
    const transactionsSortedByDate = this.#transactions.sort((a, b) => a.date.getTime() - b.date.getTime())
    let ongoingBalance = 0

    transactionsSortedByDate.forEach((transaction) => {
        if (transaction.constructor.name === 'Debit') {
        transaction.balanceAfterTransaction = numeral(ongoingBalance - Number(transaction.amount)).format("0.00")
        ongoingBalance -= Number(transaction.amount)
        } 
        if (transaction.constructor.name === 'Credit') {
        transaction.balanceAfterTransaction = numeral(ongoingBalance + Number(transaction.amount)).format("0.00")
        ongoingBalance += Number(transaction.amount)
        }
  })

    return [...transactionsSortedByDate];
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
    this.transactions = account.getTransactions();
    this.closingBalance = numeral(account.balance).format("0.00")
  }
}

let testAccount = new Account('Will Baxter', '12345678')
testAccount.credit(23.32)
testAccount.debit(12.01)

console.log(testAccount.getStatement())

export { Account };
