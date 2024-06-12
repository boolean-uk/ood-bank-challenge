import { v4 as uuidv4 } from 'uuid';
import numeral from "numeral";

class Transaction {
    constructor(amount, date, balanceAfterTransaction) {
        this.amount = amount
        this.date = date
        this.balanceAfterTransaction = numeral(balanceAfterTransaction).format("0.00")
    }

    getID() {
        return uuidv4()
    }
}

class Debit extends Transaction {
    constructor(amount, date, balanceAfterTransaction) {
        super(amount, date, balanceAfterTransaction)
        this.id = this.getID()
    }
}

class Credit extends Transaction {
    constructor(amount, date, balanceAfterTransaction) {
        super(amount, date, balanceAfterTransaction)
        this.id = this.getID()
    }
}

export { Debit, Credit }