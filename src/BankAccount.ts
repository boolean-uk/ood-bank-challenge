import { StatementGenerator, formatDate } from "./StatementGenerator"
import { Transaction } from "./Transaction"
import { createWriteStream } from "fs"
const PDFDocument = require("pdfkit")


export abstract class BankAccount {
    protected transactions: Transaction[]

    constructor() {
        this.transactions = []
    }

    public getBalance(): number {
        let balance = 0
        for(let i = 0; i < this.transactions.length; ++i) {
            let transaction = this.transactions[i]
            balance += transaction.getAmount() - transaction.getFee()
        }
        return balance
    }

    public getTransactions(): Transaction[] {
        return this.transactions
    }

    // includes extension 2.
    public withdraw(amount: number, date: Date = new Date()): boolean {
        if(this.getBalance() < amount)
            return false
        this.transactions.push(new Transaction(-amount, 0, date));
        return true;
    }

    public deposit(amount: number, date: Date = new Date()): boolean {
        this.transactions.push(new Transaction(amount, 0, date))
        return true
    }

    public addOverdraft(amount: number): boolean {
        console.log("Cannot add overdraft")
        return false
    }

    public generateStatement(): String {
        let statement = StatementGenerator.generateStatement(this.transactions)
        console.log(statement)
        return statement
    }

    // extension no. 1
    public generateStatementBetweenDates(dateFrom: Date, dateTo: Date = new Date()): String {
        let statement = StatementGenerator.generateStatementBetweenDates(this.transactions, dateFrom, dateTo)
        console.log(statement)
        return statement
    }

    public generatePDF(): void {
        const doc = new PDFDocument
        const writeStream = createWriteStream("statement.pdf")
        let date = new Date()
        doc.pipe(writeStream);
        doc.font("Courier", 24).text("This is your bank statement", { align: "center" })
        doc.fontSize(18).text(formatDate(new Date()), { align: "center" })
        doc.fontSize(18).text('\n')
        doc.fontSize(12).text(this.generateStatement())
        doc.end();
        console.log("Successfully created pdf")
    }
}