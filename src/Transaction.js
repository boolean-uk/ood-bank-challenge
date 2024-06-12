class Transaction {
    #date
    #amount
    #type
    #balance

    constructor(date, amount, type, balance) {
        this.#date = date
        this.#amount = amount 
        this.#type = type
        this.#balance = balance
    }

    getDetails() {
        return {
            date: this.#date,
            amount: this.#amount,
            type: this.#type,
            balance: this.#balance
        }
    }
}

export {Transaction}