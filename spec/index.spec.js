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
			"Not enough funds in your account for this transaction. Max withdrawal amount is €111"
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

		expect(() => myBank.newWithdrawal("wrongName", 100)).toThrowError(
			"There is no account with the provided name"
		)
		expect(() => myBank.newWithdrawal("tester1")).toThrowError(
			"You must provide an amount for the withdrawal"
		)
		expect(() => myBank.newWithdrawal("tester1", 0)).toThrowError(
			"You must provide an amount for the withdrawal"
		)
		expect(() => myBank.checkBalance("wrongName")).toThrowError(
			"There is no account with the provided name"
		)
	})

	// Create bank statement

	it("should create a new statement for an account", () => {
		myBank.newDeposit("tester1", 1000) // 1000.00€
		myBank.newDeposit("tester1", 2000) // 2000.00€
		myBank.newWithdrawal("tester1", 500) // 500.00€
		const statement = myBank.createNewStatemennt("tester1")

		const expectedStatement =
			"date               || credit      || debit    || balance\n" +
			`${new Date().toLocaleDateString()}--${new Date().toLocaleTimeString()} ||        1000.00 ||          ||  1000.00\n` +
			`${new Date().toLocaleDateString()}--${new Date().toLocaleTimeString()} ||        2000.00 ||          ||  3000.00\n` +
			`${new Date().toLocaleDateString()}--${new Date().toLocaleTimeString()} ||          ||    500.00 ||  2500.00\n`

		expect(statement).toContain(
			"date                 || credit      || debit    || balance\n"
		)
		expect(statement).toContain("1000.00")
		expect(statement).toContain("2000.00")
		expect(statement).toContain("500.00")
	})
})
