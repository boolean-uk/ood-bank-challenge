import Transaction from "./Transaction";

class bankaccount {
  constructor(
    private _balance: number = 0,
    private _transactions: Transaction[] = []
  ) {}

  get balance(): number {
    let balance: number = 0;
    for (let transaction of this._transactions) {
      balance += transaction.amount;
    }
    return balance;
  }

  deposit(amount: number, date: Date) {
    if (amount > 0) {
      const transaction = new Transaction(date, amount, "credit");
      this._transactions.push(transaction);
    }
  }

  withdraw(amount: number, date: Date) {
    const transaction = new Transaction(date, -amount, "debit");
    this._transactions.push(transaction);
  }
}

export default bankaccount;
