import {BankAccount} from "./BankAccount"

export class CheckingAccount extends BankAccount {
    private maxOverdraft = 500
    private overdraft: number
    constructor() {
        super()
        this.overdraft = 0
    }
    public override addOverdraft(amount: number): boolean {
        if(amount < 0 || this.overdraft + amount > this.maxOverdraft)
            return false
        this.overdraft += amount
        return true
    }
    public getOverdraft(): number {
        return this.overdraft
    }
}