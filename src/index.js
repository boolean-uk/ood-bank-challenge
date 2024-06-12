class BankAccount {
    #transactions

    constructor() {
        this.#transactions = []
    }

    get balance() {
        let balance = 0
        this.#transactions.forEach((transaction) => {
            balance += (transaction.credit * 100)
            balance -= (transaction.debit * 100)
        })

        return balance / 100
    }

    deposite(amount) {
        const date = new Date()
        this.#transactions.push({date: date, credit: amount, debit: 0})
    }

    withdraw(amount) {
        const date = new Date()
        this.#transactions.push({date: date, credit: 0, debit: amount})
    }

    getStatement() {
        const statement = new Statement(this.#transactions)
        return statement.print()
    }
}

class Statement {
    #transactions

    constructor(transactions) {
        this.#transactions = transactions
    }

    print() {
        let balance = 0
        function getTransaction(transaction) {
            balance += (transaction.credit * 100)
            balance -= (transaction.debit * 100)

            let debit = transaction.debit
            let credit = transaction.credit

            if(transaction.debit === 0) {
                debit = ''
            }

            if(transaction.credit === 0) {
                credit = ''
            }

            return `${transaction.date} || ${credit} || ${debit} || ${balance / 100}\n`
        }

        let allTransactions = this.#transactions.map((transaction) => getTransaction(transaction))

        allTransactions = allTransactions.reverse().join('')

        return `date || credit || debit || balance\n${allTransactions}`
    }
}

export default BankAccount