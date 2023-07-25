import { StatementGenerator } from "./StatementGenerator"
import { Transaction } from "./Transaction"


export abstract class BankAccount {
    protected transactions: Transaction[]

    constructor() {
        this.transactions = []
    }

    public getBalance(): number {
        let balance = 0
        for(let i = 0; i < this.transactions.length; ++i) {
            let transaction = this.transactions[i]
            balance += transaction.getAmount() - transaction.getFee()
        }
        return balance
    }

    public getTransactions(): Transaction[] {
        return this.transactions
    }

    // includes extension 2.
    public withdraw(amount: number, date: Date = new Date()): boolean {
        if(this.getBalance() < amount) 
            return false
        this.transactions.push(new Transaction(-amount, 0, date));
        return true;
    }

    public deposit(amount: number, date: Date = new Date()): void {
        this.transactions.push(new Transaction(amount, 0, date))
    }

    public addOverdraft(amount: number): boolean {
        console.log("Cannot add overdraft")
        return false
    }

    public generateStatement(): String {
        return StatementGenerator.generateStatement(this.transactions)
    }

    // extension no. 1
    public generateStatementBetweenDates(dateFrom: Date, dateTo: Date = new Date()): String {
        return StatementGenerator.generateStatementBetweenDates(this.transactions, dateFrom, dateTo)
    }
}