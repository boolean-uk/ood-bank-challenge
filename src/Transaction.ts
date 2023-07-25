class Transaction {
    private _amount: number;
    private _date: Date;

    constructor(amount: number, date: Date) {
        this._amount = amount;
        this._date = date;
    }
}

export default Transaction;