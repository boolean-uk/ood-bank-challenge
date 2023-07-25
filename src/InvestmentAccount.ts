import {BankAccount} from "./BankAccount"

export class InvestmentAccount extends BankAccount {
    public override addOverdraft(amount: number): boolean {
        console.log("Cannot add overdraft to investment account")
        return false
    }
}