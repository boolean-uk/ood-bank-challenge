import { InvestmentAccount } from "./InvestmentAccount"

// to run execute command `tsc ./src/index.ts` and then `node ./src/index.js`

let bankAccount = new InvestmentAccount()
bankAccount.deposit(1000, new Date("2012-01-10"))
bankAccount.deposit(2000, new Date("2012-01-13"))
bankAccount.withdraw(500, new Date("2012-01-14"))

console.log(bankAccount.generateStatement())