import Transaction from "./transaction"

class Account {
    private transactions: Transaction[] = []

    public deposit(amount: number, date: Date): boolean {
        if(amount <= 0) return false
        this.transactions.push({ amount: amount, date: date })
        return true
    }
}
export default Account