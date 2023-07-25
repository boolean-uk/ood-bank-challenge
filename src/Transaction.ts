export class Transaction {
    private readonly transactionDate: Date;
    private readonly amount: number;
    private readonly type: string;

    constructor(amount: number, type: string);
    constructor(amount: number, type: string, transactionDate: Date)

    constructor(amount: number, type: string) {
        this.amount = amount
        this.type = type
        this.transactionDate = new Date()
    }

    public getTransactionDate(): string {
        return this.formatDate(this.transactionDate)
    }

    public getAmount(): number {
        return this.amount
    }

    public getType(): string {
        return this.type
    }

    private formatDate(date: Date): string {
        const day = date.getDate().toString()
        const month = (date.getMonth() + 1).toString()
        const year = date.getFullYear()

        return `${day}/${month}/${year}`
    }
}