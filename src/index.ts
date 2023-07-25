export class Account {
  private _balance: number = 0;
  private _transactions: Transaction[] = [];

  get balance(): number {
    return this._balance;
  }

  get transactions(): Transaction[] {
    return this._transactions;
  }

  deposit(amount: number, date: object) {
    if (amount > 0) {
      this._balance += amount;
      this.transactions.push(new Transaction(amount, date));
      return "The money has been added to your account.";
    }
    return "Given amount is invalid.";
  }

  withdraw(amount: number, date: object) {
    if (amount > 0) {
      if (amount <= this._balance) {
        this._balance -= amount;
        this.transactions.push(new Transaction(-1 * amount, date));
        return "The money has been withdrawn from your account.";
      }
      return "You don't have enough money.";
    }
    return "Given amount is invalid.";
  }
}

export class Transaction {
  constructor(private _amount: number, private _date: object) {}

  get amount(): number {
    return this._amount;
  }

  get date(): object {
    return this._date;
  }
}
