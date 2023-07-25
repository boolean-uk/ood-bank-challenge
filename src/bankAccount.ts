import {Transaction} from "./transaction";

export class BankAccount {

    private _transactions: Transaction[] = []
    private _balance: number
    constructor(private _number: string) {
        this._number = _number
        this._balance = 0
    }

    get transactions(): Transaction[] {
        return this._transactions;
    }

    get number(): string {
        return this._number;
    }

    get balance(): number {
        return this._balance;
    }

    set balance(value: number) { //to delete for extension
        this._balance = value;
    }
}