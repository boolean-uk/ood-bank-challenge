import StatementGenerator from "./statementGenerator"
import Transaction from "./transaction"

export class Account {
    private transactions: Transaction[] = []
    private statementGenerator: StatementGenerator = new StatementGenerator()

    depositMoney(amount: number) {
        if (amount >= 0) { 
            this.transactions.push(new Transaction(amount))
        }
    }

    withdrawMoney(amount: number) {
        if (amount >= 0) {
            this.transactions.push(new Transaction(-amount))
        }
        console.log(this.getStatement())
    }

    calculateBalance():number {
        let balance: number
        balance = 0
        this.transactions.forEach((transaction) => {
            balance = balance + transaction.amount
            // console.log(transaction.date.getDate() + '/' + (transaction.date.getMonth()+1) + '/' + transaction.date.getFullYear() )
        })
        return balance
    }

    getStatement(): string {
        return this.statementGenerator.generateStatement(this.transactions)
    }
}