export class Transaction {
    constructor(private date: Date, private credit: number, private debit: number, private balance: number){

    }

    getDate (){
        return this.date
    }

    getCredit (){
        return this.credit
    }

    getDebit (){
        return this.debit
    }

    getBalance (){
        return this.balance
    }
}

export class Account {
    private transactions: Transaction []

    constructor(){
        this.transactions = []
    }

    deposit(amount: number): boolean {
        if(amount < 0) return false

        this.transactions.push(new Transaction(new Date(), amount, 0, this.getBalance() + amount))
        return true
    }

    withdraw(amount: number): boolean {
        if(amount < 0) return false
        if(amount > this.getBalance()) return false

        this.transactions.push(new Transaction(new Date(), 0, amount, this.getBalance() - amount))
        return true
    }

    getBalance(): number {
        let balance: number = 0

        this.transactions.forEach(transaction => {
            if(transaction.getCredit() > 0) balance += transaction.getCredit()
            else if(transaction.getDebit() > 0) balance -= transaction.getDebit()
        })

        return balance
    }

    generateStatement() {
        let result = 'date       || credit  || debit  || balance\n'

        this.transactions.reverse().forEach((transaction, index) => {
            const day = transaction.getDate().getDay() > 9 ? transaction.getDate().getDay() : `0${transaction.getDate().getDay()}`
            const month = transaction.getDate().getDay() > 9 ? transaction.getDate().getDay() : `0${transaction.getDate().getDay()}`
            const year = transaction.getDate().getFullYear()

            const credit = transaction.getCredit() === 0 ? '         ' : ` ${transaction.getCredit().toFixed(2)} `
            const debit = transaction.getDebit() === 0 ? '        ' : ` ${transaction.getDebit().toFixed(2)} `
            const balance = ` ${transaction.getBalance().toFixed(2)}`

            if(index == this.transactions.length - 1) result += `${day}/${month}/${year} ||${credit}||${debit}||${balance}`
            else result += `${day}/${month}/${year} ||${credit}||${debit}||${balance}\n`
        })

        return result
    }
}