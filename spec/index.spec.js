import Bank from "../src/index.js"

describe("Bank", () => {
	let myBank

	beforeEach(() => {
		myBank = new Bank()
	})

	// Test instanciation

	it("should be an instance of Bank", () => {
		expect(myBank).toBeInstanceOf(Bank)
	})

	it("should start with transactions and accounts as empty arrays", () => {
		expect(myBank.getTransactions().length).toBe(0)
		expect(myBank.getAccounts().length).toBe(0)
	})
})

// // Test bank functionality

describe("Bank functionalities", () => {
	let myBank
	let testCustomer1
	let testCustomer2
	let testCustomer3

	beforeEach(() => {
		myBank = new Bank()
		testCustomer1 = myBank.createNewAccount("tester1")
		testCustomer2 = myBank.createNewAccount("tester2")
		testCustomer3 = myBank.createNewAccount("tester3")
	})

	// Creating Accounts

	it("should now have 3 accounts created", () => {
		expect(myBank.getAccounts().length).toBe(3)
	})

	it("should be able to create new accounts", () => {
		myBank.createNewAccount("Perik")
		expect(myBank.getAccounts().length).toBe(4)
		myBank.createNewAccount("Erik")
		expect(myBank.getAccounts().length).toBe(5)
	})

	// Making deposits

	it("should be able to make new deposits and store them in the transactions array", () => {
		myBank.newDeposit("tester1", 100)
		myBank.newDeposit("tester1", 111)
		expect(myBank.getTransactions().length).toBe(2)
		expect(myBank.getTransactions()[0].account).toBe("tester1")
		expect(myBank.getTransactions()[0].amount).toBe(100)
		expect(myBank.getTransactions()[1].amount).toBe(111)
	})


	// Check balance

	it("should be able to check the balance of a customer", () => {
		myBank.newDeposit("tester1", 100)
		myBank.newDeposit("tester2", 111)
		expect(myBank.checkBalance("tester1")).toBe(100)
		expect(myBank.checkBalance("tester2")).toBe(111)
	})

	// Making withdrawals

	it("should be able to allow the customer to withraw money from his account", () => {
		myBank.newDeposit("tester1", 111)
		myBank.newWithdrawal("tester1", 55)
		expect(myBank.checkBalance("tester1")).toBe(56)
	})

	it("should not let a customer withdraw more money than are currently in his account", () => {
		myBank.newDeposit("tester1", 111)
		expect(() => myBank.newWithdrawal("tester1", 113)).toThrowError(
			"There are not enough funds in your account for this transaction. The maximum amount that can be removed is €111"
		)
	})

	// bank functionality general considerations

	it("should throw errors when trying to do any of the above without providing the relevant information", () => {
		expect(() => myBank.createNewAccount()).toThrowError(
			"You must provide the owner's name to create a new account"
		)
		expect(() => myBank.newDeposit(111)).toThrowError(
			"There is no account with the provided name"
		)
		expect(() => myBank.newDeposit("wrongName")).toThrowError(
			"There is no account with the provided name"
		)
		expect(() => myBank.newDeposit("tester1")).toThrowError(
			"You must provide an amount for the deposit"
		)
		expect(() => myBank.newWithdrawal(111)).toThrowError(
			"There is no account with the provided name"
		)
		expect(() => myBank.newWithdrawal("wrongName")).toThrowError(
			"There is no account with the provided name"
		)
		expect(() => myBank.newWithdrawal("tester1")).toThrowError(
			"You must provide an amount for the withdrawal"
		)
		expect(() => myBank.checkBalance("wrongName")).toThrowError(
			"There is no account with the provided name"
		)
	})
})
