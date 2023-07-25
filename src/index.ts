

export class BankAccount {

    private balance: number;
    private transactions: any = [];

    constructor() {
        this.balance = 0;
        this.transactions = []
    }

    getBalance() {
        return this.balance
    }

    deposit(amount: number, date: Date): boolean {

        const transaction = {
            date: date,
            operation: "credit",
            amount: amount,            
            balance: this.balance,
        }
        if(amount <= 0) {
            console.log("Amount can't be 0 or negative number")
            return false;
        }
        this.balance += amount;
        this.transactions.push(transaction)
        return true;
    }

    withdraw(amount: number, date: Date): boolean {

        const transaction = {
            date: date,
            operation: "credit",
            amount: amount,            
            balance: this.balance,
        }
        this.balance -= amount
        this.transactions.push(transaction)
        return true
    }
}

const account = new BankAccount()
const date = new Date("14/01/2012")
account.deposit(200,date)
console.log(account.getBalance)
