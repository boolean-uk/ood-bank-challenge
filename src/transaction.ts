export class Transaction {
  date: Date

  constructor (private readonly _amount: number) {
    this.date = new Date()
  }

  public get amount (): number {
    return this._amount
  }
}
