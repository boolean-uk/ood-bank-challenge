import Transaction from "./transaction"

export class Account {
    private transactions: Transaction[] = []

    depositMoney(amount: number) {
        if (amount >= 0) { 
            this.transactions.push(new Transaction(amount))
        }
    }

    withdrawMoney(amount: number) {
        if (amount >= 0) {
            this.transactions.push(new Transaction(-amount))
        }
    }

    calculateBalance():number {
        let balance: number
        balance = 0
        this.transactions.forEach((transaction) => {
            balance = balance + transaction.amount
        })
        return balance
    }
}