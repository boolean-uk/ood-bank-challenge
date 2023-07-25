

import { Transaction } from "./Transaction"

export class BankAccount {

    private balance: number;
    private transactions: Transaction[] = [];

    constructor() {
        this.balance = 0;
        this.transactions = []
    }

    getBalance() {
        return this.balance
    }

    deposit(amount: number, date: Date): boolean {

        const transaction = new Transaction(date, "credit", amount)
        if(amount <= 0) {
            console.log("Amount can't be 0 or negative number")
            return false;
        }
        this.balance += amount;
        this.transactions.push(transaction)
        return true;
    }

    withdraw(amount: number, date: Date): boolean {

        const transaction = new Transaction(date, "debit", amount)
        if(amount <= 0) {
            return false;
        }
        if(this.balance - amount < 0) {
            return false;
        }
        this.balance -= amount
        this.transactions.push(transaction)
        return true
    }

    printStatement(): string {
        let statement = 'date       || credit  || debit  || balance\n'
        
        return statement
    }
}

const account = new BankAccount()
const date = new Date("14/01/2012")
account.deposit(200,date)
console.log(account.getBalance)
