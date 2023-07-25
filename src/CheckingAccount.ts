import {BankAccount} from "./BankAccount"

export class CheckingAccount extends BankAccount {
    private maxOverdraft = 500
    private overdraft: number
    
    constructor() {
        super()
        this.overdraft = 0
    }

    public override addOverdraft(amount: number): boolean {
        if(amount < 0 || this.overdraft + amount > this.maxOverdraft) {
            console.log(`Failed to add overdraft`)
            return false
        }
        this.overdraft += amount
        console.log(`Successfully added overdraft`)
        return true
    }

    public getOverdraft(): number {
        console.log(`Current overdraft is ${this.overdraft}`)
        return this.overdraft
    }
}