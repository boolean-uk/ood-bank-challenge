export default class BankingSystem {
    #date
    #credit
    #debit
    #balance
    #transaction

    constructor() {
        this.#date = new Date().toDateString()
        this.#credit = 0
        this.#debit = 0
        this.#balance = 0
        this.#transaction = []
    }

    #isNumber(num) {
        return typeof num === 'number'
    }

    deposit(amount) {
        if (!this.#isNumber(amount) || amount <= 0) {
            throw new Error('Deposit invalidated.')
        }

        this.#balance += amount
        this.#transaction.push([this.#date, amount.toFixed(2), '', this.#balance.toFixed(2)])
    }

    withdraw(amount) {
        if (!this.#isNumber(amount) || amount > this.#balance || amount <= 0) {
            throw new Error('Withdraw invalidated.')
        }
        
        this.#balance -= amount
        this.#transaction.push([this.#date, '', amount.toFixed(2), this.#balance.toFixed(2)])
    }

    #givePad(name, length) {
        const str = `${name}`
        return str.padEnd(length, ' ')
    }

    printBankStatement() {
        let bankStatement = `${this.#givePad('date', 20)} || ${this.#givePad('credit', 20)} || ${this.#givePad('debit', 20)} || ${this.#givePad('balance', 20)}\n`

        this.#transaction.reverse().forEach(t => {
            bankStatement += `${this.#givePad(t[0], 20)} || ${this.#givePad(t[1], 20)} || ${this.#givePad(t[2], 20)} || ${this.#givePad(t[3], 20)}\n`
        })

        return bankStatement
    }
}
