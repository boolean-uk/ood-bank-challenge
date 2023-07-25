export abstract class Account {
    protected transactions: Transaction[] = []
    
    constructor(private number: string, private type: string) {}

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

    getNumber(): string {
        return this.number
    }

    getType(): string {
        return this.type;
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
    constructor(name: string) {
        super(name, "Saving Account")
    }

    override deposit(amount: number, date: Date): void {
        if(!this.canDeposit(amount))
            throw "Your deposit would exceed your limit of 20,000 per year."
        super.deposit(amount, date)
    }

    private canDeposit(amount: number): boolean {
        const year = new Date().getFullYear()
        const beginningOfTheYear = new Date(year, 0, 1)
        const endOfTheYear = new Date(year, 11, 31)

        const transactions = this.transactions
            .filter(t => t.date >= beginningOfTheYear && t.date <= endOfTheYear)
            .filter(t => t.amount > 0)

        const depositAmount = transactions.reduce((acc, t) => acc + t.amount, 0)
        
        if(depositAmount + amount > 2000000)
            return false

        return true
    }
}

export class InvestmentAccount extends OverdraftAccount {
    constructor(number: string, private interestRate: number) {
        super(number, "Investment Account")
    }

    calculateInterests(): number {
        const interests = this.getBalance() * this.interestRate / 100;
        this.deposit(interests, new Date())
        return interests
    }
}

export class CheckingAccount extends Account {
    constructor(name: string) {
        super(name, "Checking Account")
    }
}

export interface Transaction {
    amount: number,
    date: Date
}

interface Overdraft {
    amount: number
}