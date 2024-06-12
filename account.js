class Account {
    constructor(firstName, lastName) {
        this.firstName = firstName
        this.lastName = lastName
        this.credit = 0
        this.debit = 0
        this.id = 1
    }

    deposit(cash) {
        this.credit += cash
    }

    withdraw(cash) {
        this.debit += cash
    }

    getBalance() {

    }
}

export { Account }


const account = new Account('Frank', 'Reynolds')
account.deposit(50)
account.deposit(500)
account.withdraw(20)
console.log(account)