export class BankAccount {

    balance: number;
    transactions: never[];

    constructor() {
        this.balance = 0;
        this.transactions = []
    }

    getBalance() {
        return this.balance
    }
}
const account = new BankAccount()
console.log(account.balance)
