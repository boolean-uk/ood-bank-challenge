import { Account } from "../src/account"
import { BankStatement } from "../src/statement"

describe("Generating bank statements", () => {

    it("should print bank statement", () => {
        const account = new Account("1234")
        account.deposit(100000, new Date(2012, 0, 10))
        account.deposit(200000, new Date(2012, 0, 13))
        account.withdraw(50000, new Date(2012, 0, 14))

        const statement = new BankStatement(account)
        expect(statement.print()).toEqual(`date       || credit  || debit  || balance
14/01/2012 ||         || 500.00 || 2500.00
13/01/2012 || 2000.00 ||        || 3000.00
10/01/2012 || 1000.00 ||        || 1000.00
`)
    })

})