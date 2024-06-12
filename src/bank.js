class Bank {
    #accounts
    constructor() {
        this.#accounts = []
    }

    addAccountInfo(account) {
        console.log(account)
        const isObject = typeof account === 'object'
        const isNumbeCredit = typeof account.credit === 'number'
        const isNumberDebit = typeof account.debit === 'number' 
        if (
           !isObject ||
           !isNumbeCredit ||
           !isNumberDebit ||
           account.date === undefined) {
            throw 'Invalid entry'
           }
        this.#accounts.push(account)
    }

    get accounts() {
        return [...this.#accounts]
    }
}
const bankInst = new Bank()
// console.log(bankInst.accounts)

export default Bank