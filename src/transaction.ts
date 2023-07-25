export class Transaction {
  private readonly _date: Date

  constructor(private readonly _amount: number) {
    this._date = new Date()
  }

  public get amount(): number {
    return this._amount
  }

  public get date(): Date {
    return this._date
  }

  public dateToString(): string {
    return this._date.getDate() + '/' + (this._date.getMonth() + 1) + '/' + this._date.getFullYear()
  }
}
