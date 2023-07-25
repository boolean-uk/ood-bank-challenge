class bankaccount {
  constructor(private _balance: number = 0) {}

  get balance(): number {
    return this._balance;
  }

  deposit(amount: number) {
    if (amount > 0) this._balance += amount;
  }

  withdraw(amount: number) {
    this._balance -= amount;
  }
}

export default bankaccount;
