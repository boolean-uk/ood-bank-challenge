import {Transaction} from "./transaction";

export class BankAccount {

    private _transactions: Transaction[] = []
    constructor(private _number: string) {
        this._number = _number
    }

    get transactions(): Transaction[] {
        return this._transactions;
    }

    get number(): string {
        return this._number;
    }

    get balance(): number {
        let balance: number = 0
        for(let t of this.transactions)
            balance+=t.amount
        return balance
    }
}