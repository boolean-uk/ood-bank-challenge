import { BankAccount } from "./bank-account.js";
import { TransactionsPrint } from "./transactions-print.js";

const myBankAccount = new BankAccount
const printer = new TransactionsPrint
    myBankAccount.deposit(1000, '10-01-2012')
    myBankAccount.deposit(500, '11-01-2012')
    myBankAccount.deposit(500, '11-01-2012')
    myBankAccount.withdraw(1500, '10-01-2012')
    const myTransactions = myBankAccount.getTransactions
    

    console.log(printer.print(myTransactions))
    // console.log(myBankAccount.getTransactions)