import { BankAccount } from "./BankAccount"
import { Transaction } from "./Transaction"

export class SavingsAccount extends BankAccount {
    private defaultFee = 5
    public override getBalance(): number {
        let balance = 0
        for(let i = 0; i < this.transactions.length; ++i) {
            let transaction = this.transactions[i]
            balance += transaction.getAmount() - transaction.getFee()
        }
        return balance
    }
    public override withdraw(amount: number): boolean {
        if(this.getBalance() < amount + this.defaultFee) 
            return false
        this.transactions.push(new Transaction(-amount, this.defaultFee));
        return true;
    }
    public override deposit(amount: number): void {
        this.transactions.push(new Transaction(amount))
    }
    public override addOverdraft(): boolean {
        return false
    }
    public override generateStatement(): void {
        
    }
}