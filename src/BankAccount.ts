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

    public withdraw(amount: number): boolean {
        if(this.getBalance() < amount) 
            return false
        this.transactions.push(new Transaction(-amount));
        return true;
    }

    public deposit(amount: number): void {
        this.transactions.push(new Transaction(amount))
    }

    public addOverdraft(amount: number): boolean {
        console.log("Cannot add overdraft")
        return false
    }

    public generateStatement(): String {
        return StatementGenerator.generateStatement(this)
    }
}