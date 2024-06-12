class Bank {
    #accounts
    #loggedIn
    #date
    #transactions
    constructor(date, accounts) {
        this.#date = date
        this.#accounts = accounts
        this.#loggedIn = false
    }
    date(date) {
        if (typeof date !== "string") {
            throw "date must be a string"
        }
        this.#date = date
    }
    logIn(userId, password) {
        const search = this.#accounts.find(account => account.user === userId)
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
        if (typeof amount !== "number") {
            throw "amount must be a number"
        }
        this.#transactions.unshift({date: this.#date, type: "credit", amount: amount})
    }
    withdrawl(amount) {
        if (this.#loggedIn === false) {
            throw "You must log in"
        }
        if (typeof amount !== "number") {
            throw "amount must be a number"
        }
        this.#transactions.unshift({date: this.#date, type: "debit", amount: amount})
    }
    statement() {
        if (this.#loggedIn === false) {
            throw "You must log in"
        }
        console.log("Date       || Credit    || Debit     || Balance")
        let total = 0
        this.#transactions.forEach(transaction => {
            total += transaction.amount
            // console.log()
            let dateText = transaction.date
            let creditText
            let debitText
            // if ()
            // conditoins for how text is presented
            // console.log(transaction.date.length)
            for(let i = dateText.length; i < 11; i++) {
                dateText += " "
            }

            console.log(`${dateText}|| 2000.00   || 2000.00   || ${total.toString()}`)
        })
        
    }
}

const bank = new Bank("12/6/2024", [{user: 1, password: "asdf", transactions: [{date: "11/6/2024", type: "debit", amount: 250.00}, {date: "10/6/2024", type: "credit", amount: 500.00}]}, {user: 2, password: "john", transactions: []}])
bank.date("12/6/2024")
bank.logIn(1, "asdf")
bank.deposit(500)
bank.withdrawl(50)
bank.statement()
