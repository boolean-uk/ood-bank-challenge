export abstract class Account {
    private transactions: Transaction[] = []
    
    constructor(private number: string) {}

    deposit(amount: number, date: Date) {
        this.transactions.push({amount, date})
    }

    withdraw(amount: number, date: Date) {
        if(!this.canWithdraw(amount))
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

    canWithdraw(amount: number): boolean {
        return this.getBalance() >= amount
    }
}

export abstract class OverdraftAccount extends Account {
    private overdraft?: Overdraft;

    setOverdraft(overdraft: Overdraft) {
        this.overdraft = overdraft
    }

    override canWithdraw(amount: number): boolean {
        return this.getBalance() + (this.overdraft?.amount ?? 0) >= amount
    }
}

export class SavingAccount extends OverdraftAccount {

}

export class InvestmentAccount extends OverdraftAccount {
    constructor(number: string, private interestRate: number) {
        super(number)
    }

    calculateInterests(): number {
        const interests = this.getBalance() * this.interestRate / 100;
        this.deposit(interests, new Date())
        return interests
    }
}

export class CheckingAccount extends Account {}

export interface Transaction {
    amount: number,
    date: Date
}

interface Overdraft {
    amount: number
}