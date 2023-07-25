import {Transaction} from "./Transaction";
import {BankStatementGenerator} from "./BankStatementGenerator";

export class Account {
    private readonly accountOwner: string
    private readonly transactionHistory: Transaction[]

    constructor(accountOwner: string) {
        this.accountOwner = accountOwner
        this.transactionHistory = []
    }

    depositMoney(amountDeposited: number): boolean {
        if (amountDeposited < 0)  {
            return false
        }
        this.transactionHistory.push(new Transaction(amountDeposited, 'deposit'))
        return true;
    }

    withdrawMoney(amountWithdrawn: number): boolean {
        if (amountWithdrawn > this.calculateBalance()) {
            return false
        }
        this.transactionHistory.push(new Transaction(amountWithdrawn, 'withdrawal'))
        return true
    }

    calculateBalance(): number {
        let balance = 0;
        for (const transaction of this.transactionHistory) {
            balance += transaction.type === 'deposit' ? transaction.amount : -transaction.amount
        }
        return balance
    }

    addTransaction(addedTransaction: Transaction) {
        this.transactionHistory.push(addedTransaction)
    }

    generateBankStatement() {
        const transactions = this.sortTransactionsOldestToNewest()
        const bankStatementGenerator = new BankStatementGenerator()
        return bankStatementGenerator.generateBankStatement(transactions,0)
    }

    generateBankStatementBetweenDates(startDate: Date, endDate: Date) {
        this.sortTransactionsOldestToNewest()
        const transactions = this.filterTransactionsByDate(startDate,endDate)
        const balance = this.calculateBalanceBeforeTransaction(transactions[0])
        const bankStatementGenerator = new BankStatementGenerator()
        return bankStatementGenerator.generateBankStatement(transactions, balance)
    }

    getTransactionHistory(): Transaction[] {
        return this.transactionHistory
    }

    private sortTransactionsOldestToNewest(): Transaction[] {
        return this.transactionHistory.sort((a, b) => a.transactionDate.getTime() - b.transactionDate.getTime())
    }

    private filterTransactionsByDate(startDate: Date, endDate: Date): Transaction[] {
        return this.transactionHistory.filter((transaction) => {
            const transactionDate = transaction.transactionDate;
            return transactionDate >= startDate && transactionDate <= endDate;
        });
    }

    private calculateBalanceBeforeTransaction(targetTransaction: Transaction): number {
        const targetTransactionIndex = this.transactionHistory.indexOf(targetTransaction)

        const transactionsBeforeTarget = this.transactionHistory.slice(0, targetTransactionIndex)
        return transactionsBeforeTarget.reduce((balance, transaction) => {
            balance += transaction.type === 'deposit' ? transaction.amount : -transaction.amount
            return balance
        }, 0)
    }
}
