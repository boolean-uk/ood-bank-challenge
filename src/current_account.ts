import { Account } from "./account";
import { Transaction } from './transaction'

export class CurrentAccount extends Account {
    public static readonly OVERDRAFT: number = 500
    private overdraftAllowed: boolean = false

    override withdraw(amount: number): void {
        if (!this.overdraftAllowed) {
            super.withdraw(amount)
        }

        if (amount < 0) {
            throw new Error('Amount must be a positive number')
        }

        if (this.getBalance() + CurrentAccount.OVERDRAFT < amount) {
            throw new Error('Amount must not exceed overdraft')
        }

        this.transactions.push(new Transaction(amount * -1))
    }

    approveOverdraft(): void {
        this.overdraftAllowed = true
    }

    rejectOverdraft(): void {
        this.overdraftAllowed = false
    }
}