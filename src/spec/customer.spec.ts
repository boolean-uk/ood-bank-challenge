import {Customer} from "../customer";
import {BankAccount} from "../bankAccount";
import {Transaction} from "../transaction";

describe("Deposit and withdrawal transactions", () => {
    let customer: Customer
    let account: BankAccount
    let deposit1: Transaction
    let withdrawal1: Transaction
    let withdrawal2: Transaction
    beforeEach(() => {
        account = new BankAccount('11111')
        customer = new Customer('Alex', account)
        deposit1 = new Transaction(100)
        withdrawal1 = new Transaction(-150)
        withdrawal2 = new Transaction(-250)
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

    it("should apply overdraft", () => {
        customer.addTransaction(deposit1)
        customer.getOverdraft()
        expect(customer.account.overdraftAmount).toBe(0)
        customer.addTransaction(deposit1)
        customer.getOverdraft()
        expect(customer.account.overdraftAmount).toBe(0)
        customer.addTransaction(withdrawal1)
        customer.getOverdraft()
        expect(customer.account.overdraftAmount).toBe(500)
    })

    it("should make changes to overdraftAmount", () => {
        customer.addTransaction(deposit1)
        customer.addTransaction(deposit1)
        customer.addTransaction(withdrawal1)
        customer.getOverdraft()
        expect(customer.account.overdraftAmount).toBe(500)
        expect(customer.account.balance).toBe(50)
        customer.addTransaction(withdrawal1)
        expect(customer.account.overdraftAmount).toBe(400)
        expect(customer.account.balance).toBe(-100)
        customer.addTransaction(withdrawal1)
        expect(customer.account.overdraftAmount).toBe(250)
        expect(customer.account.balance).toBe(-250)
        customer.addTransaction(withdrawal1)
        expect(customer.account.overdraftAmount).toBe(100)
        expect(customer.account.balance).toBe(-400)
        customer.addTransaction(withdrawal2)
        expect(customer.account.overdraftAmount).toBe(100)
        expect(customer.account.balance).toBe(-400)
        customer.addTransaction(deposit1)
        expect(customer.account.overdraftAmount).toBe(200)
        expect(customer.account.balance).toBe(-300)
        customer.addTransaction(deposit1)
        customer.addTransaction(deposit1)
        customer.addTransaction(deposit1)
        expect(customer.account.overdraftAmount).toBe(500)
        expect(customer.account.balance).toBe(0)
    })
})