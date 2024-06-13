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
    get dateValue() {
        return this.#date
    }
    get loggedIn() {
        return this.#loggedIn
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
        return `${amount.toString()} deposited`
    }
    withdrawl(amount) {
        if (this.#loggedIn === false) {
            throw "You must log in"
        }
        if (typeof amount !== "number") {
            throw "amount must be a number"
        }
        this.#transactions.unshift({date: this.#date, type: "debit", amount: amount})
        return `${amount.toString()} withdrawn`
    }
    statement() {
        if (this.#loggedIn === false) {
            throw "You must log in"
        }
        const returnArray = []
        // console.log("Date       || Credit     || Debit      || Balance")
        returnArray.push(console.log("Date       || Credit     || Debit      || Balance"))
        let total = 0
        this.#transactions.forEach(transaction => {
            if (transaction.type === "debit") {
                total -= transaction.amount
            }
            if (transaction.type === "credit") {
                total += transaction.amount
            }
        })

        this.#transactions.forEach(transaction => {
            let dateText = transaction.date
            let creditText
            let debitText
            if (transaction.type === "debit") {
                creditText = "           "
                debitText = transaction.amount.toString()
                for(let i = debitText.length; i < 11; i++) {
                    debitText += " "
                }
            }
            if (transaction.type === "credit") {
                debitText = "           "
                creditText = transaction.amount.toString()
                for(let i = creditText.length; i < 11; i++) {
                    creditText += " "
                }
            }
            for(let i = dateText.length; i < 11; i++) {
                dateText += " "
            }


            // console.log(`${dateText}|| ${creditText}|| ${debitText}|| ${total.toString()}`)
            returnArray.push(console.log(`${dateText}|| ${creditText}|| ${debitText}|| ${total.toString()}`))
            if (transaction.type === "debit") {
                total += transaction.amount 
            }
            if (transaction.type === "credit") {
                total -= transaction.amount
            }
        })
        return returnArray   
    }
}

// const bank = new Bank("12/6/2024", [{user: 1, password: "asdf", transactions: [{date: "11/6/2024", type: "debit", amount: 250.00}, {date: "10/6/2024", type: "credit", amount: 500.00}]}, {user: 2, password: "john", transactions: []}])
// bank.date("12/6/2024")
// bank.logIn(1, "asdf")
// bank.deposit(500)
// bank.withdrawl(50)
// bank.statement()

export default Bank
