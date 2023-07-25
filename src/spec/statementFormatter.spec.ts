import {Customer} from "../customer";
import {BankAccount} from "../bankAccount";
import {Transaction} from "../transaction";
import {StatementFormatter} from "../statementFormatter";

describe("Bank statement formatter", () => {
    let customer: Customer
    let account: BankAccount
    let deposit1: Transaction
    let deposit2: Transaction
    let withdrawal1: Transaction
    let withdrawal2: Transaction
    let formatter: StatementFormatter
    beforeEach(() => {
        account = new BankAccount('11111')
        customer = new Customer('Alex', account)
        deposit1 = new Transaction(100)
        deposit2 = new Transaction(250)
        withdrawal1 = new Transaction(-150)
        withdrawal2 = new Transaction(-200)
        formatter = new StatementFormatter(customer)
    })

    it("should print and return formatted bank statement", () => {
        customer.addTransaction(deposit1)
        customer.addTransaction(withdrawal2)
        customer.addTransaction(deposit2)
        customer.addTransaction(deposit2)
        customer.addTransaction(withdrawal1)
        customer.addTransaction(withdrawal2)
        customer.addTransaction(deposit2)
        customer.addTransaction(withdrawal2)
        expect(customer.account.balance).toBe(300)

        let expected: string = 'date       || credit || debit  || balance\n' +
            '25/07/2023 || 100.00 ||        || 100\n' +
            '25/07/2023 || 250.00 ||        || 350\n' +
            '25/07/2023 || 250.00 ||        || 600\n' +
            '25/07/2023 ||        || 150.00 || 450\n' +
            '25/07/2023 ||        || 200.00 || 250\n' +
            '25/07/2023 || 250.00 ||        || 500\n' +
            '25/07/2023 ||        || 200.00 || 300'
        //formatter.generateStatement()
        expect(formatter.generateStatement().trim()).toBe(expected)
    })
})