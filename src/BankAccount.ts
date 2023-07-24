import Transaction from "./transaction";

class BankAccount {
    private transactions: Transaction[] = []
    private balance: number = 0

    public deposit(amount: number, date: Date): boolean {
        if(amount <= 0) return false

        this.balance += amount
        this.transactions.push({ amount: amount, date: date })
        return true
    }

    public withdraw(amount: number, date: Date): boolean {
        if(amount <= 0) return false

        if(this.balance < amount) return false

        this.balance -= amount
        this.transactions.push({ amount: -amount, date: date })
        return true
    }

    public showAccountHistory(): string {
        const result: string[] = []
        let balance: number = 0
        result.push("date       || credit  || debit  || balance\n");

        this.transactions.forEach((transaction: Transaction) => {
            balance += transaction.amount

            result.push(transaction.date.toLocaleDateString().padEnd(11) + "||")

            if(transaction.amount > 0) {
                result.push(" " + String(transaction.amount).padEnd(8))
                result.push("||" + " ".repeat(8))
            }
            else {
                result.push(" ".repeat(9) + "||")
                result.push(" " + String(transaction.amount).padEnd(7))
            }
            result.push("|| " + String(balance))
            result.push("\n")
        })

        return result.join("")
    }
}

export default BankAccount