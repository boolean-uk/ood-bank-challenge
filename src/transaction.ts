export class Transaction {

    private _type: boolean = true
    private _date: Date
    constructor(private _amount: number) {
        this._date = new Date(Date.now())
        this._amount = _amount
        if(this._amount<0)
        this._type = false
    }

    get date(): Date {
        return this._date;
    }

    get amount(): number {
        return this._amount;
    }


    get type(): boolean {
        return this._type;
    }

}