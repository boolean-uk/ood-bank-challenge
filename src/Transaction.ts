class Transaction {
    private _amount: number;
    private _balance: number;
    private _date: string;
    private _hour_minute: string;

    constructor(amount: number, balance: number, date: string, hour_minute: string) {
        this._amount = amount
        this._balance = balance;
        this._date = date;
        this._hour_minute = hour_minute;
    }

    get amount(): number {
        return this._amount;
    }

    get balance(): number {
        return this._balance;
    }

    get date(): string {
        return this._date;
    }

    get hour_minute(): string {
        return this._hour_minute;
    }
}

export default Transaction;