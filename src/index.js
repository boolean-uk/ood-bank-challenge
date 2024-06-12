class Bank {
    constructor() {
        this.name = 'Account Holder'
        this.credit = 0
        this.debit = 0
        this.balance = 0
    }

    depositCash(cash) {
        this.credit += cash
    }

    withdrawCash(cash) {
        this.debit += cash
    }

}

class Account extends Bank {
    constructor(name) {
        super().name = name
    }

    checkBalance() {
        this.balance = this.credit + this.debit
        return this.balance
    }
}

const bank = new Bank()
const account = new Account('Frank Reynolds')
account.depositCash(1000)
account.checkBalance()