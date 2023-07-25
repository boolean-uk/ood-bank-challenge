import { existsSync } from "fs"
import { Account, CheckingAccount } from "../src/account"
import { PDFStatement, TextStatement } from "../src/statement"


describe("Generating bank statements", () => {

    let account: Account

    beforeEach(() => {
        account = new CheckingAccount("1234")
        account.deposit(100000, new Date(2012, 0, 10))
        account.deposit(200000, new Date(2012, 0, 13))
        account.withdraw(50000, new Date(2012, 0, 14))
    })

    it("should print bank statement", () => {
        const statement = new TextStatement(account)
        expect(statement.print()).toEqual(`date       || credit  || debit  || balance
14/01/2012 ||         || 500.00 || 2500.00
13/01/2012 || 2000.00 ||        || 3000.00
10/01/2012 || 1000.00 ||        || 1000.00
`)
    })

    
    it("should print bank statement only for 13 and 14 of Januar 2012", () => {
        const statement = new TextStatement(account, new Date(2012, 0, 13))
        expect(statement.print()).toEqual(`date       || credit  || debit  || balance
14/01/2012 ||         || 500.00 || 2500.00
13/01/2012 || 2000.00 ||        || 3000.00
`)
    })

    it("should print bank statement only for 10 and 13 of Januar 2012", () => {
        const statement = new TextStatement(account, new Date(2012, 0, 10), new Date(2012, 0, 13))
        expect(statement.print()).toEqual(`date       || credit  || debit || balance
13/01/2012 || 2000.00 ||       || 3000.00
10/01/2012 || 1000.00 ||       || 1000.00
`)
    })

    it("should create pdf statement", () => {
        const statement = new PDFStatement(account)
        const path = statement.print()
        expect(existsSync(path)).toEqual(true)
    })

})