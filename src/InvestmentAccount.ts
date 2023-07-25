import {BankAccount} from "./BankAccount"

export class InvestmentAccount extends BankAccount {
    public override  getBalance(): number {
        return 0
    }
    public override  withdraw(): boolean {
        return false
    }
    public override  deposit(amount: number): void {

    }
    public override  addOverdraft(): boolean {
        return false
    }
    public override  generateStatement(): void {
        
    }
}