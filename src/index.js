import { BankAccount } from "./bank-account.js";
import { TransactionsPrint } from "./transactions-print.js";

const myBankAccount = new BankAccount
const printer = new TransactionsPrint
const thisDay = Date

myBankAccount.deposit(1000.55)
myBankAccount.deposit(400.33)
myBankAccount.deposit(500.22)
myBankAccount.withdraw(1500.11)
myBankAccount.deposit(500.66)
// myBankAccount.withdraw(500.33)
// console.log(myBankAccount.getTransactions)
const myTransactions = myBankAccount.getTransactions


console.log(printer.print(myTransactions))
// console.log(myBankAccount.getTransactions)