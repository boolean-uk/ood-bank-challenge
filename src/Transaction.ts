
export class Transaction {
    private date: Date
    private amount: number
    private fee: number
    constructor(amount: number, fee: number, date: Date = new Date()) {
        this.date = date
        this.amount = amount
        this.fee = fee
    }
    getDate(): Date { return this.date }
    getAmount(): number { return this.amount }
    getFee(): number {return this.fee }
}