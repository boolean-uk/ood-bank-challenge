
export class Account {
    private _accountNum: string
    private _balance = 0

    constructor(accountNum: string){
        this._accountNum = accountNum
    }

    public get accountNum(){
        return this._accountNum
    }

    public get balance() {
        return this._balance
    }
    
}