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

    public override deposit(amount: number, date: Date = new Date()): boolean {
        if(this.getYearDeposit(date.getFullYear()) + amount > 20000)
            return false
        this.transactions.push(new Transaction(amount, 0, date))
        return true
    }

    public override addOverdraft(amount: number): boolean {
        console.log("Cannot add overdraft to savings account")
        return false
    }

    public getYearDeposit(year: number): number{
        let total = 0
        for (let i = 0; i < this.transactions.length; ++i) {
            let transaction = this.transactions[i]
            if(transaction.getDate().getFullYear() === year)
                total += transaction.getAmount()
        }
        return total
    }
}