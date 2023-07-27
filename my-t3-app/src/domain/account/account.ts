import { Transaction, TransactionType } from "./transaction";

export class Account {
  private balance: number;
  private transactionHistory: Transaction[];

  constructor() {
    this.balance = 0;
    this.transactionHistory = [];
  }

  getBalance(): number {
    return this.balance;
  }

  getTransactionHistory(): Transaction[] {
    return this.transactionHistory;
  }

  deposit(date: Date, amount: number) {
    if (!this.isValidDate(date)) {
      throw new Error("Invalid date object for deposit.");
    }

    if (!this.isValidPositiveNumber(amount)) {
      throw new Error(
        "Invalid deposit amount. Amount must be a positive number."
      );
    }

    const depositTransaction = new Transaction(
      date,
      amount,
      TransactionType.DEPOSIT
    );
    this.transactionHistory.push(depositTransaction);
    this.balance += amount;
  }

  withdraw(date: Date, amount: number) {
    if (!this.isValidDate(date)) {
      throw new Error("Invalid date object for withdrawal.");
    }

    if (!this.isValidPositiveNumber(amount)) {
      throw new Error(
        "Invalid withdrawal amount. Amount must be a positive number."
      );
    }

    if (this.balance >= amount) {
      const withdrawalTransaction = new Transaction(
        date,
        amount,
        TransactionType.WITHDRAWAL
      );
      this.transactionHistory.push(withdrawalTransaction);
      this.balance -= amount;
    } else {
      throw new Error("Insufficient funds for withdrawal.");
    }
  }
  getStatement() {
    let statement = "date       || credit  || debit  || balance\n";
    let currentBalance = 0;
    const myBalance = [];

    for (const transaction of this.transactionHistory) {
      const transactionAmount = transaction.getAmount();

      if (transaction.getType() === TransactionType.DEPOSIT) {
        currentBalance += transactionAmount;
        myBalance.push(transactionAmount);
      } else {
        currentBalance -= transactionAmount;
        myBalance.push(-transactionAmount);
      }
    }

    for (let i = this.transactionHistory.length - 1; i >= 0; i--) {
      const transaction = this.transactionHistory[i];

      if (myBalance[i] > 0) {
        statement += `${this.formatDate(transaction.getDate())} || ${myBalance[
          i
        ].toFixed(2)} ||        || ${currentBalance.toFixed(2)}\n`;
      } else {
        statement += `${this.formatDate(
          transaction.getDate()
        )} ||         || ${(-myBalance[i]).toFixed(
          2
        )} || ${currentBalance.toFixed(2)}\n`;
      }

      currentBalance -= myBalance[i]; // Update the current balance
    }

    return statement;
  }

  getMinimumDate(): Date {
    if (this.transactionHistory.length === 0) {
      throw new Error("No transactions found.");
    }

    return this.transactionHistory[0].getDate();
  }

  getMaximumDate(): Date {
    if (this.transactionHistory.length === 0) {
      throw new Error("No transactions found.");
    }

    return this.transactionHistory[
      this.transactionHistory.length - 1
    ].getDate();
  }

  getStatementsBetweenDates(startDate: Date, endDate: Date): string {
    let statement = "date       || credit  || debit  || balance\n";
    let currentBalance = 0;
    const myBalance = [];

    // Filter transactions between the given dates
    const transactionsInRange = this.transactionHistory.filter(
      (transaction) =>
        transaction.getDate() >= startDate && transaction.getDate() <= endDate
    );

    for (const transaction of transactionsInRange) {
      const transactionAmount = transaction.getAmount();

      if (transaction.getType() === TransactionType.DEPOSIT) {
        currentBalance += transactionAmount;
        myBalance.push(transactionAmount);
      } else {
        currentBalance -= transactionAmount;
        myBalance.push(-transactionAmount);
      }
    }

    for (let i = transactionsInRange.length - 1; i >= 0; i--) {
      const transaction = transactionsInRange[i];

      if (myBalance[i] > 0) {
        statement += `${this.formatDate(transaction.getDate())} || ${myBalance[
          i
        ].toFixed(2)} ||        || ${currentBalance.toFixed(2)}\n`;
      } else {
        statement += `${this.formatDate(
          transaction.getDate()
        )} ||         || ${(-myBalance[i]).toFixed(
          2
        )} || ${currentBalance.toFixed(2)}\n`;
      }

      currentBalance -= myBalance[i]; // Update the current balance
    }

    return statement;
  }

  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  }

  private isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
  private isValidPositiveNumber(value: number): boolean {
    return !isNaN(value) && value > 0;
  }
}
