import { Account } from './Account'
import { LocalDateTime } from 'js-joda';

export class CheckingAccount extends Account {

    protected OverdraftLimit: number = 500;
    constructor(accountNumber: number, password: string) {
        super(accountNumber, password);
    }

    public Overdraft(request: boolean): boolean {
        this.isOverdraft = request;
        return this.isOverdraft;
    }

    public withdraw(amount: number): boolean {
        Account.balance = Account.Balance();
        if (amount > 0) {
            if (Account.balance >= amount) {
                const negativeAmount: number = -amount;
                Account.transactionHistory.push(negativeAmount);
                Account.transactionDate.push(LocalDateTime.now());
                console.log(`You have successfully withdrew ${amount}$.`);
                return true;
            } else if (this.isOverdraft) {
                if (-(Account.balance - amount) <= this.OverdraftLimit) {
                    const negativeAmount: number = -amount;
                    Account.transactionHistory.push(negativeAmount);
                    Account.transactionDate.push(LocalDateTime.now());
                    console.log(`You have successfully withdrew ${amount}$.`);
                    return true;
                }
                console.log(`You don't have enough balance to withdraw ${amount}$.`);
                return false;
            }
            console.log(`You don't have enough balance to withdraw ${amount}$.`);
            return false;
        }
        console.log("You can't withdraw a negative balance.");
        return false;
    }
}