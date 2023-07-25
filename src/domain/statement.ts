import jsPDF from "jspdf";
import { Account, Transaction } from "./account";
import { formatDate, formatMoney } from "./utils";

export abstract class BankStatement {
    constructor(
        protected account: Account,
        protected fromDate: Date = new Date(1970, 0, 1),
        protected toDate: Date = new Date()
    ) {}

    abstract print(): string

    protected getTransactions(): Transaction[] {
        return this.account.getTransactions()
            .filter(t => t.date >= this.fromDate && t.date <= this.toDate)
            .sort((t1, t2) => t2.date.getTime() - t1.date.getTime())
    }
}

export class TextStatement extends BankStatement {
    print(): string {
        const columns: {[key: string]: string[]} = {
            date: ["date"],
            credit: ["credit"],
            debit: ["debit"],
            balance: ["balance"]
        }

        const transactions = this.getTransactions()
        
        this.fillColumns(columns, transactions)
        this.alignColumns(columns)

        let result = ""

        for(let i = 0; i < columns["date"].length; i++)
            result += this.printRow(columns, i)

        return result
    }

    private fillColumns(columns: {[key: string]: string[]}, transactions: Transaction[]) {
        let currentBalance = this.account.getBalanceOn(this.toDate)
        
        transactions.forEach(transaction => {
            columns["date"].push(formatDate(transaction.date))
            columns["balance"].push(formatMoney(currentBalance))
            if(transaction.amount > 0) {
                columns["credit"].push(formatMoney(transaction.amount))
                columns["debit"].push("")
            } else {
                columns["debit"].push(formatMoney(-transaction.amount))
                columns["credit"].push("")
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
            columns["date"][rowIndex],
            columns["credit"][rowIndex],
            columns["debit"][rowIndex],
            columns["balance"][rowIndex]
        ].join(" || ") + "\n"
    }
}

export class JSONStatement extends BankStatement {
    override print(): string {
        return JSON.stringify(this.generateData())
    }

    generateData(): { [key: string]: string }[] {
        const data: { [key: string]: string }[] = []

        let currentBalance = this.account.getBalanceOn(this.toDate)
        this.getTransactions().forEach(t => {
            data.push({
                    date: formatDate(t.date),
                    credit: t.amount > 0 ? formatMoney(t.amount) : " ",
                    debit: t.amount < 0 ? formatMoney(-t.amount) : " ",
                    balance: formatMoney(currentBalance)
            })
            currentBalance -= t.amount
        })

        return data
    }
}

export class PDFStatement extends JSONStatement {
    constructor(
        account: Account,
        private outputPath: string,
        fromDate: Date = new Date(1970, 0, 1),
        toDate: Date = new Date()
    ) {
        super(account, fromDate, toDate)
    }

    override print(): string {
        const doc = new jsPDF()
        
        doc.setFontSize(14)
        doc.text(`Bank Statement for ${formatDate(this.fromDate)}-${formatDate(this.toDate)} period`, 20, 20)
        doc.table(20, 25, this.generateData(), ["date", "credit", "debit", "balance"], { autoSize: true })

        doc.save(this.outputPath)
        return this.outputPath
    }
}