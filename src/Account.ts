import { LocalDateTime } from 'js-joda';
export class Account {

    protected accountNumber: number;
    protected password: string;
    protected static balance: number = 0;
    static transactionHistory: number[] = [];
    static transactionDate: LocalDateTime[] = [];
    protected isOverdraft: boolean;

    constructor(accountNumber: number, password: string) {
        this.accountNumber = accountNumber;
        Account.balance = 0;
        this.password = password;
        Account.transactionHistory = [];
        Account.transactionDate = [];
        this.isOverdraft = false;
    }

    public getTransactionHour(i: number): number {
        const times: LocalDateTime = Account.transactionDate[i];
        return times.hour();
    }
    
    public static Balance(): number {
        Account.balance = 0;
        for (const i of Account.transactionHistory) {
            Account.balance += i;
        }
        return Account.balance;
    }

    public deposit(amount: number): boolean {
        if (amount > 0) {
            Account.transactionHistory.push(amount);
            Account.transactionDate.push(LocalDateTime.now());
            console.log(`Successfully deposited ${amount}$.`);
            return true;
        }
        console.log("You can't deposit a negative balance!");
        return false;
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
            } 
            console.log(`You don't have enough balance to withdraw ${amount}$.`);
            return false;
        }
        console.log("You can't withdraw a negative balance.");
        return false;
    }

}
