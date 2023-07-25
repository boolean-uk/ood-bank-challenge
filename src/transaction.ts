class Transaction {
    date: Date = new Date(Date.now())
    amount: number
    constructor(amount: number) {
        this.amount = amount
    }
}

export default Transaction