export class Transaction {
    date: Date;

    constructor(private _amount: number) {
        this.date = new Date()
    }

    public get amount(): number {
        return this._amount;
    }
}