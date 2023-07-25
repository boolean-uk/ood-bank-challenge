import Transaction from "../src/Transaction";

class BankAccount {
    private transactions: Transaction[] = []
    private overDraft: number = 0

    public deposit(amount: number, date: Date): boolean {
        if(amount <= 0) return false

        this.transactions.push({ amount: amount, date: date })
        return true
    }

    private calculateBalance(): number {
        let balance: number = 0
        this.transactions.forEach((transaction: Transaction) => {
            balance += transaction.amount
        })

        return balance
    }

    public allowOverDraft() {
        this.overDraft = 500
    }

    public withdraw(amount: number, date: Date): boolean {
        if(amount <= 0) return false

        if(this.calculateBalance() + this.overDraft < amount) return false

        this.transactions.push({ amount: -amount, date: date })
        return true
    }
}

export default BankAccount;