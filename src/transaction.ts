import { Decimal } from 'decimal.js';

export class Transaction {
  constructor(
    private _date: Date,
    private _amount: Decimal,
  ) {}

  toJSON() {
    return {
      date: this._date.toISOString(),
      amount: this._amount.toFixed(2),
    };
  }

  static fromJSON(json: { date: string; amount: string }): Transaction {
    return new Transaction(new Date(json.date), new Decimal(json.amount));
  }

  get date() {
    return this._date;
  }

  get amount() {
    return this._amount;
  }
}
