class Bank {
    #accounts
    constructor() {
        this.#accounts = []
    }

    accountTransactions(account) {
        const isObject = typeof account === 'object'

        if (!isObject) {
            throw 'Invalid entry'
           }
        this.#accounts.push(account)
    }

    get accounts() {
        return [...this.#accounts]
    }
}
const bankInst = new Bank()


export default Bank