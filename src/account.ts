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

    public printStatement(): string {
        let currentBalance = 0
        const stringStatement: string[] = []
        stringStatement.push("date       || credit  || debit  || balance\n");

        this.transactions.forEach((transaction: Transaction) => {
            currentBalance += transaction.amount
            if(this.transactions.includes(transaction)) {
                stringStatement.push(transaction.date.toLocaleDateString().padEnd(11) + "||")
                //Debit
                if (transaction.amount < 0) {
                    stringStatement.push(" ".repeat(9) + "||")
                    stringStatement.push(" " + String(Math.abs(transaction.amount)).padEnd(7))    
                } 
                //Credit
                else {
                    stringStatement.push(" " + String(transaction.amount).padEnd(8))
                    stringStatement.push("||" + " ".repeat(8))                 
                }
                stringStatement.push("|| " + String(currentBalance) +"\n")
            }
        })
        return stringStatement.join("")
    }
}
export default Account

