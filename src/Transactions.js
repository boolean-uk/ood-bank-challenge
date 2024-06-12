import { v4 as uuidv4 } from 'uuid';
import numeral from "numeral";

class Transaction {
    constructor(amount, date) {
        this.amount = amount
        this.date = date
    }

    getID() {
        return uuidv4()
    }
}

class Debit extends Transaction {
    constructor(amount, date) {
        super(amount, date)
        this.id = this.getID()
    }
}

class Credit extends Transaction {
    constructor(amount, date) {
        super(amount, date)
        this.id = this.getID()
    }
}

export { Debit, Credit }