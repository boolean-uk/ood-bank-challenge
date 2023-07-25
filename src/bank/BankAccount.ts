import Statement from "./Statement";
import Transaction from "./Transaction";

class BankAccount {
  constructor(protected _transactions: Transaction[] = []) {}

  get balance(): number {
    let balance: number = 0;
    for (let transaction of this._transactions) {
      balance += transaction.amount;
    }
    return balance;
  }
  get transactions(): Transaction[] {
    return this._transactions;
  }
  deposit(amount: number, date: Date) {
    if (amount > 0) {
      const transaction = new Transaction(date, amount, "credit");
      this._transactions.push(transaction);
    }
  }

  withdraw(amount: number, date: Date) {
    if (amount <= this.balance) {
      const transaction = new Transaction(date, -amount, "debit");
      this._transactions.push(transaction);
    }
  }

  generateStatement() {
    let statement: Statement = new Statement(this);
    statement.print();
  }
  generateOrderedStatement(from: Date, to: Date) {
    let statement: Statement = new Statement(this);
    statement.print(from, to);
  }
  generatePdf() {
    let statement: Statement = new Statement(this);
    statement.generatePDF("bank_statement.pdf");
  }
  addInterest() {}
}

export default BankAccount;
