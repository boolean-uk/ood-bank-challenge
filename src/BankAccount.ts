import Transaction from "./Transaction";

class BankAccount {
    private _balance: number = 0;
    private _transactions: Transaction[] = [];

    get balance(): number {
        return this._balance;
    }

    get transactions(): Transaction[] {
        return this._transactions;
    }

}

export default BankAccount;