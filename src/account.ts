export class Account {
    private transactions: Transaction[] = []
    
    constructor(private number: string) {}

    deposit(amount: number, date: Date) {
        this.transactions.push({amount, date})
    }

    withdraw(amount: number, date: Date) {
        if(this.getBalance() - amount < 0)
            throw "You don't have that much money."
        this.transactions.push({amount: -amount, date})
    }

    getBalance(): number {
        return this.transactions.reduce((acc, t) => acc + t.amount, 0)
    }

    getBalanceOn(date: Date) {
        return this.transactions
            .filter(t => t.date <= date)
            .reduce((acc, t) => acc + t.amount, 0)
    }

    getTransactions(): Transaction[] {
        return structuredClone(this.transactions)
    }
}

export interface Transaction {
    amount: number,
    date: Date
}