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
}

export default BankAccount