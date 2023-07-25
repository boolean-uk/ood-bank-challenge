import {BankAccount} from "./bankAccount";
import {Transaction} from "./transaction";

export class Customer {

    constructor(private _name: string, private _account: BankAccount) {
        this._name = _name
        this._account = _account
    }

    get name(): string {
        return this._name;
    }

    get account(): BankAccount {
        return this._account;
    }

    addTransaction(transaction: Transaction) {
        if (!transaction.type && transaction.amount * (-1) > this.account.balance)
            return
        this.account.transactions.push(transaction)
        this.account.balance += transaction.amount //to delete for extension}

    }
}