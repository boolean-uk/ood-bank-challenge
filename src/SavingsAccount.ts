import { BankAccount } from "./BankAccount"
import { Transaction } from "./Transaction"

export class SavingsAccount extends BankAccount {
    private defaultFee = 5
    
    public override withdraw(amount: number, date: Date = new Date()): boolean {
        if(this.getBalance() < amount + this.defaultFee) 
            return false
        this.transactions.push(new Transaction(-amount, this.defaultFee, date));
        return true;
    }

    public override addOverdraft(amount: number): boolean {
        console.log("Cannot add overdraft to savings account")
        return false
    }
}