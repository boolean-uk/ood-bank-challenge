class Statement {
    #transactions

    constructor(transactions) {
        this.#transactions = transactions
    }

    formatStatement() {
        const formattedTransactions =
        this.#transactions.slice().reverse().map(transaction => {
            let { date, amount, type, balance } = transaction.getDetails()
            const formattedAmount = (amount / 100).toFixed(2) // convert back to pounds
            const formattedBalance = (balance / 100).toFixed(2)
            if (type === 'credit') {
                return `${date} || ${formattedAmount} ||        || ${formattedBalance}`
            } else {
                return `${date} ||        || ${formattedAmount} || ${formattedBalance}`
            }
        })
        return formattedTransactions.join('\n') 
    }
}

export { Statement }