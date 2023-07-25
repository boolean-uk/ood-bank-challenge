import Transaction from "./transaction"

class Account {
    private transactions: Transaction[] = []

    public deposit(amount: number, date: Date): boolean {
        if(amount <= 0) return false
        this.transactions.push({ amount: amount, date: date })
        return true
    }

    public withdraw(amount: number, date: Date): boolean {
        if(amount <= 0 || this.getBalance() < amount) 
        return false
        this.transactions.push({ amount: -amount, date: date })
        return true
    }

    private getBalance(): number {
        let balance = 0
        this.transactions.forEach((transaction: Transaction) => {
            balance += transaction.amount
        })
        return balance 
    }
}
export default Account