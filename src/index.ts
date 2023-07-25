

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

    getTransaction(): Transaction[] {        
        return this.transactions
    }

    deposit(amount: number, date: Date): boolean {

        
        if(amount <= 0) {
            console.log("Amount can't be 0 or negative number")
            return false;
        }

        this.balance += amount;
        const transaction = new Transaction(date, "credit", amount, this.balance)
        this.transactions.push(transaction) 
        this.sortTransactionsByDate()       
        return true;
    }

    withdraw(amount: number, date: Date): boolean {

        
        if(amount <= 0) {
            return false;
        }
        if(this.balance - amount < 0) {
            return false;
        }
        this.balance -= amount
        const transaction = new Transaction(date, "debit", amount, this.balance)
        this.transactions.push(transaction)
        
        return true
    }

    printStatement(): string {
        let statement = "date       ||  credit   ||   debit   || balance\n";
        let balance = 0
        this.transactions
        .sort((a, b) => a.getDate().toLocaleTimeString().localeCompare(b.getDate().toLocaleTimeString()))
        .reverse();

        for(const transaction of this.transactions) {
            //const date = this.formatDate(transaction.getDate())
            const date = transaction.getDate().toLocaleDateString()
            //const date = transaction.getDate()            
            const amount = transaction.getAmount().toFixed(2)
            const emptyString = ''

            if(transaction.getOperation() === "credit") {
                balance += transaction.getAmount()
                const FormatBalance = balance.toFixed(2)
                statement += `${date} || ${amount.padStart(7)} || ${emptyString.padStart(7)} || ${transaction.getBalance().toFixed(2)}\n`
            }else {
                balance -= transaction.getAmount()
                const FormatBalance = balance.toFixed(2)
                statement += `${date} || ${emptyString.padStart(7)} || ${amount.padStart(7)} || ${transaction.getBalance().toFixed(2)}\n`
            }

        }

        
        
        return statement
    }

    sortTransactionsByDate() {
        this.transactions.sort((a, b) => a.getDate().getTime() - b.getDate().getTime());
    }



}

const account = new BankAccount()
const date = new Date("14/01/2012")
account.deposit(200,date)
console.log(account.getBalance)
