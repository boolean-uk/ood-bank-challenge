class Transaction {
  constructor(
    private _dateOf: Date,
    private _amount: number,
    private _type: "credit" | "debit"
  ) {}

  get amount(): number {
    return this._amount;
  }
  get date(): Date {
    return this._dateOf;
  }
  get type(): "credit" | "debit" {
    return this._type;
  }
}

export default Transaction;
