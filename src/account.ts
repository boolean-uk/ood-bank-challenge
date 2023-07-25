import StatementGenerator from "./statementGenerator"
import Transaction from "./transaction"

export class Account {
    private transactions: Transaction[] = []
    private statementGenerator: StatementGenerator = new StatementGenerator()
    private overdraft: boolean = false
    private overdraftLimit: number = 500

    depositMoney(amount: number) {
        if (amount >= 0) { 
            this.transactions.push(new Transaction(amount))
        }
    }

    withdrawMoney(amount: number) {
        if (amount >= 0 
            && ((!this.overdraft && this.calculateBalance() >= amount) 
            || (this.overdraft && this.calculateBalance() + this.overdraftLimit >= amount))) {
            this.transactions.push(new Transaction(-amount))
        }
    }

    calculateBalance():number {
        let balance: number
        balance = 0
        this.transactions.forEach((transaction) => {
            balance = balance + transaction.amount
        })
        return balance
    }

    getStatement(): string {
        return this.statementGenerator.generateStatement(this.transactions)
    }

    getStatementBetweenDates(date1: Date, date2: Date): string {
        return this.statementGenerator.generateStatementWithDates(this.transactions, date1, date2)
    }

    addOverdraft() {
        if(!this.overdraft){
            this.overdraft = true
        }
    }
}