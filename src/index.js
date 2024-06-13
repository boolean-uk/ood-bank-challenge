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

        return balance
    }

    get transactions() {
        return JSON.stringify([...this.#transactions])
    }

    deposite(amount) {
        const depositAmount = currency(amount)
        let date = new Date()
        date = date.toLocaleDateString()

        const savingsAccountTransactions = this.#transactions.filter((transaction) => transaction.type === 'savings account')

        let totalDeposits = 0

        savingsAccountTransactions.forEach((transaction) => {
            totalDeposits = currency(totalDeposits).add(transaction.credit)
        })

        if (currency(totalDeposits).add(amount) > currency(20000)) {
            throw 'maximum deposit limit of 20000 per year reached'
        }

        this.#transactions.push({date: new Date(), credit: depositAmount, debit: 0, type: this.type})
    }

    withdraw(amount) {
        const withdrawlAmount = currency(amount)
        let date = new Date()
        date = date.toLocaleDateString()
        let balance = this.balance

        if(currency(balance).add(this.overdraft).subtract(amount) < 0) {
            throw 'Amount exceeds the available funds'
        }

        this.#transactions.push({date: new Date(), credit: 0, debit: withdrawlAmount, type: this.type})
    }

    getStatement(date1, date2) {
        const statement = new Statement(this.#transactions, this.overdraft)
        return statement.print(date1, date2)
    }
}

class Statement {
    #transactions
    #overdraft

    constructor(transactions, overdraft) {
        this.#transactions = transactions
        this.#overdraft = overdraft
    }

    print(date1, date2) {
        let transactions = null
        let overdraft = 0
        let balance = 0

        if(!date1 && !date2) {
            transactions = this.#transactions
        } else {
            transactions = this.#transactions.filter((item) => {
                let date = item.date
                date = new Date(date)
    
                return item.date.getTime() >= date1.getTime() && item.date.getTime() <= date2.getTime()
            })

            date1 = new Date(date1)
            date2 = new Date(date2)
        }

        if (this.#overdraft) {
            overdraft = this.#overdraft
        }

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

            return `${transaction.date.toLocaleDateString()} || ${credit} || ${debit} || ${balance} || ${overdraft}\n`
        }

        let allTransactions = transactions.map((transaction) => getTransaction(transaction))

        allTransactions = allTransactions.reverse().join('')

        return `date || credit || debit || balance || overdraft\n${allTransactions}`
    }
}

class SavingsAccount extends BankAccount {
    #type 

    constructor() {
        super()
        this.#type = 'savings account'
    }

    get type() {
        return this.#type
    }
}

class InvestmentAccount extends BankAccount {
    #type 

    constructor() {
        super()
        this.#type = 'investment account'
    }

    get type() {
        return this.#type
    }
}

class CheckingAccount extends BankAccount {
    #type 
    #overdraft

    constructor() {
        super()
        this.#type = 'checking account'
        this.#overdraft = 0
    }

    get type() {
        return this.#type
    }

    addOverdraft(amount) {
        this.#overdraft = currency(amount)
    }

    get overdraft() {
        return this.#overdraft
    }
}

export default SavingsAccount
export { InvestmentAccount, CheckingAccount }