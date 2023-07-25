export class Transaction {
    private date: Date
    private operation: string
    private amount: number            
    
    constructor(date: Date, operation: string, amount: number) {
        this.date = date
        this.operation = operation
        this.amount = amount
    }

    getDate(): Date {
        return this.date
    }

    getOperation(): string {
        return this.operation
    }

    getAmount(): number {
        return this.amount
    }
}