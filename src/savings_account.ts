import { Account } from './account'

export class SavingsAccount extends Account {
    public static readonly MAX_DEPOSIT_PER_YEAR = 20_000

    override deposit(amount: number): void {
        let amountDepositedThisYear = this.transactions
            .filter(transaction => transaction.amount > 0)
            .filter(transaction => transaction.date.getFullYear() === new Date().getFullYear())
            .reduce((accumulator, transaction) => accumulator + transaction.amount, 0)

        if (amount + amountDepositedThisYear > SavingsAccount.MAX_DEPOSIT_PER_YEAR)
            throw new Error(`${amount} + ${amountDepositedThisYear} exceeds the maximum allowed yearly deposit of ${SavingsAccount.MAX_DEPOSIT_PER_YEAR}`)

        super.deposit(amount)
    }
}
