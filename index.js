class Bank {
    #accounts
    #loggedIn
    #date
    #transactions
    constructor(date, accounts) {
        this.#date = date
        this.#accounts = accounts
        this.#loggedIn = false
        // console.log(this.#date)
        // console.log(this.#accounts)
        // console.log(this.#accounts[0].transactions)
    }
    date(date) {
        if (typeof date !== "string") {
            throw "date must be a string"
        }
        this.#date = date
    }
    logIn(userId, password) {
        const search = this.#accounts.find(account => account.user === userId)
        // console.log(search)
        if (search === undefined) {
            throw "User doesn't exist"
        }
        if (search.password !== password) {
            throw "Password incorrect"
        }
        this.#loggedIn = true
        this.#transactions = search.transactions
    }
    deposit(amount) {
        if (this.#loggedIn === false) {
            throw "You must log in"
        }
        console.log(this.#transactions)
    }
    withdrawl(amount) {
        if (this.#loggedIn === false) {
            throw "You must log in"
        }
    }
    statement() {
        
    }
}

const bank = new Bank("12/6/2024", [{user: 1, password: "asdf", transactions: [{date: "11/6/2024", type: "debit", amount: 250.00}, {date: "10/6/2024", type: "credit", amount: 500.00}]}, {user: 2, password: "john", transactions: []}])
bank.date("12/6/2024")
bank.logIn(1, "asdf")
bank.deposit(500)

// console.log("hi there")
