import { Deposit } from "./Deposit"
import { Transfer } from "./Transfer"

export class Account {
    private _accountNum: string
    private _transactions: Transfer[]

    constructor(accountNum: string){
        this._accountNum = accountNum
        this._transactions = []
    }

    public get accountNum(){
        return this._accountNum
    }

    public get transactions() {
        return this._transactions
    }

    deposit(amountOfMoney: number) {
        this._transactions.push(new Deposit(amountOfMoney))
    }
    
}