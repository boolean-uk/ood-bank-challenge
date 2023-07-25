class Transaction {
    date: number = Date.now()
    amount: number
    constructor(amount: number) {
        this.amount = amount
    }
}

export default Transaction