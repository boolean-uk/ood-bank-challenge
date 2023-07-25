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
    const depositTransaction = new Transaction(
      date,
      amount,
      TransactionType.DEPOSIT
    );
    this.transactionHistory.push(depositTransaction);
    this.balance += amount;
  }

  withdraw(date: Date, amount: number) {
    if (this.balance >= amount && amount > 0) {
      const withdrawalTransaction = new Transaction(
        date,
        amount,
        TransactionType.WITHDRAWAL
      );
      this.transactionHistory.push(withdrawalTransaction);
      this.balance -= amount;
    } else {
      throw Error("Insufficient funds for withdrawal.");
    }
  }

  getStatement() {
    let statement = "date       || credit  || debit  || balance\n";
    let currentBalance = 0;

    for (const transaction of this.transactionHistory.reverse()) {
      if (transaction.getType() === "deposit") {
        currentBalance += transaction.getAmount();
        statement += `${this.formatDate(transaction.getDate())} || ${transaction
          .getAmount()
          .toFixed(2)} ||        || ${currentBalance.toFixed(2)}\n`;
      } else {
        currentBalance -= transaction.getAmount();
        statement += `${this.formatDate(
          transaction.getDate()
        )} ||         || ${transaction
          .getAmount()
          .toFixed(2)} || ${currentBalance.toFixed(2)}\n`;
      }
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
}
