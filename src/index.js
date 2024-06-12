import { BankAccount } from "./bank-account.js";
import { TransactionsPrint } from "./transactions-print.js";

const myBankAccount = new BankAccount
const printer = new TransactionsPrint
const thisDay = Date

myBankAccount.deposit(1000)
myBankAccount.deposit(500)
myBankAccount.deposit(500)
myBankAccount.withdraw(1500)
const myTransactions = myBankAccount.getTransactions


console.log(printer.print(myTransactions))
// console.log(myBankAccount.getTransactions)