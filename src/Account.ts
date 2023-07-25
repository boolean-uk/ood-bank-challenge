import { Deposit } from "./Deposit"
import { Transfer } from "./Transfer"
import { Withdraw } from "./Withdraw"

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

    withdraw(amountOfMoney: number) {
        this._transactions.push(new Withdraw(amountOfMoney))
    }

    calculateBalance(): number {
        let balance = 0

        for (let i = 0; i < this._transactions.length; i ++) {
            if (this._transactions[i] instanceof Withdraw) {
                balance -= this._transactions[i].amountOfMoney
            }
            else balance += this._transactions[i].amountOfMoney
        }

        return balance
    }
    
}