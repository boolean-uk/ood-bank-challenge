import {Customer} from "./customer";
import {BankAccount} from "./bankAccount";
import {Transaction} from "./transaction";
import {StatementFormatter} from "./statementFormatter";
import {PdfGenerator} from "./pdfGenerator";

let account: BankAccount = new BankAccount('11111')
let customer: Customer = new Customer('Alex', account)
let deposit1: Transaction = new Transaction(100)
let deposit2: Transaction = new Transaction(250)
let withdrawal1: Transaction = new Transaction(-150)
let withdrawal2: Transaction = new Transaction(-200)
let formatter: StatementFormatter = new StatementFormatter(customer)

customer.addTransaction(deposit1)
customer.addTransaction(withdrawal2)
customer.addTransaction(deposit2)
customer.addTransaction(deposit2)
customer.addTransaction(withdrawal1)
customer.addTransaction(withdrawal2)
customer.addTransaction(deposit2)
customer.addTransaction(withdrawal2)

formatter.generateStatement()
PdfGenerator.generatePDFFromText(formatter.generateStatement(), 'BankStatement.pdf')