import currency from "currency.js"
import { sub, differenceInMonths } from "date-fns"
import { jsPDF } from "jspdf"

const doc = new jsPDF();

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

        const oneYearAgo = sub(new Date(), {
            years: 1
        })

        let transactionsBetweenDates = this.getBetweendates(oneYearAgo, new Date(), savingsAccountTransactions)

        transactionsBetweenDates.forEach((transaction) => {
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
        let transactionstransactionsBetweenDates = null

        if (date1 && date2) {
            transactionstransactionsBetweenDates = this.getBetweendates(date1, date2, this.#transactions)
        }
        
        const statement = new Statement(this.#transactions, this.overdraft)
        return statement.print(transactionstransactionsBetweenDates)
    }

    getBetweendates(date1, date2, data) {
        const transactionstransactionsBetweenDates = data.filter((item) => {
            let date = item.date
            date = new Date(date)

            return item.date.getTime() >= date1.getTime() && item.date.getTime() <= date2.getTime()
        })

        return transactionstransactionsBetweenDates
    }

    getPDF(date1, date2) {
        const statement = this.getStatement(date1, date2)

        doc.text(statement, 10, 10)
        doc.save('a4.pdf')

        return statement
    }

    payInterest() {
        if (this.type === 'investment account' && this.monthsOld > 0) {
            let balance = this.balance

            for (let i = 0; i < this.monthsOld; i++){
                balance = currency(balance).add(balance * 0.02)
            }

            return balance
        }
    }
}

class Statement {
    #transactions
    #overdraft

    constructor(transactions, overdraft) {
        this.#transactions = transactions
        this.#overdraft = overdraft
    }

    print(transactionstransactionsBetweenDates) {
        let transactions = null
        let overdraft = 0
        let balance = 0

        if(!transactionstransactionsBetweenDates) {
            transactions = this.#transactions
        } else {
            transactions = transactionstransactionsBetweenDates
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
    #createdDate
    #monthsOld

    constructor() {
        super()
        this.#type = 'investment account'
        this.#createdDate = sub(new Date(), {months: 3})
        this.#monthsOld = 0
    }

    get type() {
        return this.#type
    }

    get monthsOld() {
        const today = new Date()

        this.#monthsOld = differenceInMonths(today, this.#createdDate)

        return this.#monthsOld
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