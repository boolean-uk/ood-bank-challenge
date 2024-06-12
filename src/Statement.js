class Statement {
    #transactions

    constructor(transactions) {
        this.#transactions = transactions
    }

    formatStatement() {
        const header = 'date || credit || debit || balance'
        const formattedTransactions = this.#transactions.slice().reverse().map(transaction => {
            const { date, amount, type, balance } = transaction.getDetails()
            
            // Format date to 'dd/mm/yyyy'
            const transactionDate = new Date(date)
            const formattedDate = `${transactionDate.getDate().toString().padStart(2, '0')}/${(transactionDate.getMonth() + 1).toString().padStart(2, '0')}/${transactionDate.getFullYear()}`
            
            const formattedAmount = (amount / 100).toFixed(2)
            const formattedBalance = (balance / 100).toFixed(2)
            
            if (type === 'credit') {
                return `${formattedDate} || ${formattedAmount} ||        || ${formattedBalance}`
            } else {
                return `${formattedDate} ||        || ${formattedAmount} || ${formattedBalance}`
            }
        })
        
        return [header, ...formattedTransactions].join('\n')
    }
    
    
}

export { Statement }
