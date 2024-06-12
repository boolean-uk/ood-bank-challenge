import currency from "currency.js"

class BankAccount {
    #transactions

    constructor() {
        this.#transactions = []
    }

    get balance() {
        let balance = 0
        this.#transactions.forEach((transaction) => {
            balance = currency(balance).add(transaction.credit)
            balance = currency(balance).subtract(transaction.debit)
        })

        return balance.toString()
    }

    deposite(amount) {
        const depositAmount = currency(amount)
        const date = new Date()
        this.#transactions.push({date: date, credit: depositAmount, debit: 0})
    }

    withdraw(amount) {
        const withdrawlAmount = currency(amount)
        const date = new Date()
        this.#transactions.push({date: date, credit: 0, debit: withdrawlAmount})
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
            balance = currency(balance).add(transaction.credit)
            balance = currency(balance).subtract(transaction.debit)

            let debit = transaction.debit
            let credit = transaction.credit

            if(transaction.debit === 0) {
                debit = ''
            }

            if(transaction.credit === 0) {
                credit = ''
            }

            return `${transaction.date} || ${credit} || ${debit} || ${balance}\n`
        }

        let allTransactions = this.#transactions.map((transaction) => getTransaction(transaction))

        allTransactions = allTransactions.reverse().join('')

        console.log(`date || credit || debit || balance\n${allTransactions}`)

        return `date || credit || debit || balance\n${allTransactions}`
    }
}

export default BankAccount