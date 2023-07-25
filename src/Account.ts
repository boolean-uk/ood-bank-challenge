
export class Account {
    private _accountNum: string
    private _transactions = []

    constructor(accountNum: string){
        this._accountNum = accountNum
    }

    public get accountNum(){
        return this._accountNum
    }

    public get transactions() {
        return this._transactions
    }
    
}