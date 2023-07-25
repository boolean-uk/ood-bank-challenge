import { Customer } from './src/extension/Customer'
import { CurrentAccount } from './src/extension/CurrentAccount'
import { TRANSACTION_TYPE } from './src/enums/TRANSACTION_TYPE'

// printing bank statement
let customer: Customer = new Customer('John', 'Doe', new Date('1990-01-01'))
const current = new CurrentAccount(customer)

current.createTransaction(1000, TRANSACTION_TYPE.CREDIT, new Date('2020-01-10'))
current.createTransaction(2000, TRANSACTION_TYPE.CREDIT, new Date('2020-01-13'))
current.createTransaction(500, TRANSACTION_TYPE.DEBIT, new Date('2020-01-14'))

current.printBankStatement()

console.log('-------------------------------------------------')
// printing bank statement between 2 given dates
current.printBankStatementBetween(
  new Date('2020-01-10'),
  new Date('2020-01-13')
)
// generates bank statement in PDF
current.generatePDF()
