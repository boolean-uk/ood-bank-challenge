class Transaction {
    private _amount: number;
    private _date: string;
    private _hour_minute: string;

    constructor(amount: number, date: string, hour_minute: string) {
        this._amount = amount;
        this._date = date;
        this._hour_minute = hour_minute;
    }
}

export default Transaction;