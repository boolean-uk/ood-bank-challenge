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

    deposit(amount: number): void {
        if (amount < 0) {
            throw new Error('You cannot deposit a negative amount');
        }
        this._balance += amount;
        const hour_minute = new Date().getHours() + ":" + new Date().getMinutes();
        const transaction = new Transaction(amount, this.balance, new Date().toLocaleDateString(), hour_minute);
        this._transactions.push(transaction);
    }

    withdraw(amount: number): void {
        if (amount < 0) {
            throw new Error('You cannot withdraw a negative amount');
        }
        if (amount > this.balance) {
            throw new Error('You cannot withdraw more than your balance');
        }

        this._balance -= amount;
        const hour_minute = new Date().getHours() + ":" + new Date().getMinutes();
        const transaction = new Transaction(-amount, this.balance, new Date().toLocaleDateString(), hour_minute);
        this._transactions.push(transaction);
    }

}

export default BankAccount;