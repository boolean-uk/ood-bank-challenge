import {BankAccount} from "./bankAccount";
import {Transaction} from "./transaction";

export class Customer {

    private _overdraft: boolean = false
    constructor(private _name: string, private _account: BankAccount) {
        this._name = _name
        this._account = _account
    }

    get overdraft(): boolean {
        return this._overdraft;
    }

    set overdraft(value: boolean) {
        this._overdraft = value;
    }

    get name(): string {
        return this._name;
    }

    get account(): BankAccount {
        return this._account;
    }

    addTransaction(transaction: Transaction): void {
        if (!transaction.type && !this.overdraft && transaction.amount * (-1) > this.account.balance)
                return

        if (this.overdraft) {
            if (transaction.amount * (-1) > this.account.balance + 500)
                return
            else if (!transaction.type && this.account.balance < 0)
                this.account.overdraftAmount += transaction.amount
            else if (!transaction.type && transaction.amount * (-1) > this.account.balance)
                this.account.overdraftAmount += transaction.amount + this.account.balance
            else if (transaction.type) {
                this.account.overdraftAmount += transaction.amount
                this.account.overdraftAmount = Math.min(this.account.overdraftAmount, 500)
            }

        }
            this.account.transactions.push(transaction)
            if (this.account.transactions.length >= 3) this.overdraft = true
    }

    getOverdraft(): void {
        if(this.overdraft) this.account.overdraftAmount = 500
    }
}