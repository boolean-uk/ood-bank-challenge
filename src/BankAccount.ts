import { Transaction } from "./Transaction"


export abstract class BankAccount {
    protected transactions: Transaction[]
    public abstract getBalance(): number
    public abstract withdraw(amount: number): boolean
    public abstract deposit(amount: number): void
    public abstract addOverdraft(): boolean
    public abstract generateStatement(): void
    constructor() {
        this.transactions = []
    }
}