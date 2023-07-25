import {BankAccount} from "./BankAccount"

export class InvestmentAccount extends BankAccount {
    private interestRate = 2

    public override addOverdraft(amount: number): boolean {
        console.log("Cannot add overdraft to investment account")
        return false
    }

    public generateInterestIncome(): number {
        let income = this.getBalance() * this.interestRate / 100
        this.deposit(income)
        return income
    }
    
    public getInterestRate() {
        return this.interestRate
    }
}