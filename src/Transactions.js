class Transaction {
    constructor(amount, date) {
        this.amount = amount
        this.date = date
    }
}

class Debit extends Transaction {
    constructor(amount, date) {
        super(amount, date)
    }
}

class Credit extends Transaction {
    constructor(amount, date) {
        super(amount, date)
    }
}

export { Debit, Credit }