class Bank {
    #transactions
    constructor() {
        this.#transactions = []
    }

    makeTransaction(transaction) {
        const isObject = typeof transaction === 'object'
        const isNumbeCredit = typeof transaction.credit === 'number'
        const isNumberDebit = typeof transaction.debit === 'number' 
        if (
           !isObject ||
           !isNumbeCredit ||
           !isNumberDebit ||
           transaction.date === undefined) {
            throw 'Invalid entry'
           }
        this.#transactions.push(transaction.id, transaction)
    }
}

export default Bank