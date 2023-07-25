import { InvestmentAccount } from "./InvestmentAccount"

// to run execute command `tsc ./src/index.ts` and then `node ./src/index.js`

let bankAccount = new InvestmentAccount()
bankAccount.deposit(1000, new Date("2012-01-10"))
bankAccount.deposit(2000, new Date("2012-01-13"))
bankAccount.withdraw(500, new Date("2012-01-14"))
bankAccount.deposit(1000, new Date("2015-01-10"))
bankAccount.deposit(2000, new Date("2015-02-13"))
bankAccount.withdraw(500, new Date("2015-02-14"))
bankAccount.deposit(1000)
bankAccount.deposit(1000)
bankAccount.deposit(1000)

bankAccount.generatePDF()

console.log(bankAccount.generateStatement())
console.log()
console.log(bankAccount.generateStatementBetweenDates(new Date("2015-01-11"), new Date()))