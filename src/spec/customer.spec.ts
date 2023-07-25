import {Customer} from "../customer";
import {BankAccount} from "../bankAccount";
import {Transaction} from "../transaction";

describe("Deposit and withdrawal transactions", () => {
    let customer: Customer
    let account: BankAccount
    let deposit1: Transaction
    let withdrawal1: Transaction
    beforeEach(() => {
        account = new BankAccount('11111')
        customer = new Customer('Alex', account)
        deposit1 = new Transaction(100)
        withdrawal1 = new Transaction(-150)
    })

    it("should deposit funds to the account", () => {
        customer.addTransaction(deposit1)
        customer.addTransaction(deposit1)
        expect(customer.account.balance).toBe(200)
        customer.addTransaction(deposit1)
        expect(customer.account.balance).toBe(300)
    })

    it("should withdraw funds from the account", () => {
        customer.addTransaction(withdrawal1)
        expect(customer.account.balance).toBe(0)
        customer.addTransaction(deposit1)
        expect(customer.account.balance).toBe(100)
        customer.addTransaction(deposit1)
        customer.addTransaction(withdrawal1)
        expect(customer.account.balance).toBe(50)
        customer.addTransaction(deposit1)
        customer.addTransaction(withdrawal1)
        expect(customer.account.balance).toBe(0)
    })
})