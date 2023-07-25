import { Account, Transaction } from "./account";
import { formatDate, formatMoney } from "./utils";

export class BankStatement {
    constructor(
        private account: Account,
        private fromDate: Date = new Date(1970, 0, 1),
        private toDate: Date = new Date()
    ) {}

    print(): string {
        const columns: {[key: string]: string[]} = {
            date: ["date"],
            credit: ["credit"],
            debit: ["debit"],
            balance: ["balance"]
        }

        const transactions = this.account.getTransactions()
            .filter(t => t.date >= this.fromDate && t.date <= this.toDate)
            .sort((t1, t2) => t2.date.getTime() - t1.date.getTime())
        
        this.fillColumns(columns, transactions)
        this.alignColumns(columns)

        let result = ""

        for(let i = 0; i < columns.date.length; i++)
            result += this.printRow(columns, i)

        return result
    }

    private fillColumns(columns: {[key: string]: string[]}, transactions: Transaction[]) {
        let currentBalance = this.account.getBalanceOn(this.toDate)
        
        transactions.forEach(transaction => {
            columns.date.push(formatDate(transaction.date))
            columns.balance.push(formatMoney(currentBalance))
            if(transaction.amount > 0) {
                columns.credit.push(formatMoney(transaction.amount))
                columns.debit.push("")
            } else {
                columns.debit.push(formatMoney(-transaction.amount))
                columns.credit.push("")
            }
            currentBalance -= transaction.amount
        })
    }

    private alignColumns(columns: {[key: string]: string[]}) {
        Object.keys(columns).forEach(key => {
            const maxLength = Math.max(...columns[key].map(v => v.length))
            columns[key] = columns[key].map(v => v + " ".repeat(maxLength - v.length))
        })
    }

    private printRow(columns: {[key: string]: string[]}, rowIndex: number): string {
        return [
            columns.date[rowIndex],
            columns.credit[rowIndex],
            columns.debit[rowIndex],
            columns.balance[rowIndex]
        ].join(" || ") + "\n"
    }

}