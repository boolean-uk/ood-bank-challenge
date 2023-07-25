export class Account {
  private _balance: number = 0;

  get balance(): number {
    return this._balance;
  }

  deposit(amount: number, date: object) {
    if (amount > 0) {
      this._balance += amount;
      return "The money has been added to your account.";
    }
    return "Given amount is invalid.";
  }
}
