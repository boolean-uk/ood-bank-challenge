// Account Types: Savings, Investment, Checking
import { v4 as uuidv4 } from "uuid"

export default class Bank {
	#accounts
	#transactions
	constructor(idGenerator = uuidv4) {
		this.idGenerator = uuidv4
		this.#accounts = []
		this.#transactions = []
	}
	getAccounts() {
		return this.#accounts
	}
	getTransactions() {
		return this.#transactions
	}

	getDate() {
		const d = new Date()
		let currentdate = `${d.getDate()}/${
			d.getMonth() + 1
		}/${d.getFullYear()}--${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
		return currentdate
	}

	createNewAccount(owner) {
		if (!owner) {
			throw new Error(
				"You must provide the owner's name to create a new account"
			)
		}
		const newAccount = {
			name: owner,
			id: this.idGenerator(),
			dateCreated: this.getDate(),
		}
		this.#accounts.push(newAccount)
	}

	findAccount(account) {
		if (!account) {
			throw new Error(
				"You must provide an account name for this transaction"
			)
		}
		const getByName = this.#accounts.find(
			(acc) => acc.name === account
		)
		const getById = this.#accounts.find((acc) => acc.id === account)
		if (getByName) {
			return getByName
		}
		if (getById) {
			return getById
		}
		throw new Error("There is no account with the provided name")
	}

	checkBalance(acc) {
		const accountToCheck = this.findAccount(acc)
		const totalDeposits = this.#transactions.reduce(
			(sum, transaction) => {
				if (
					transaction.type === "deposit" &&
					transaction.name === accountToCheck.name
				) {
					return sum + transaction.amount
				}
				return sum
			},
			0
		)
		const totalWithdrawals = this.#transactions.reduce(
			(sum, transaction) => {
				if (
					transaction.type === "withdrawal" &&
					transaction.name === accountToCheck.name
				) {
					return sum + transaction.amount
				}
				return sum
			},
			0
		)
		const balance = totalDeposits - totalWithdrawals
		console.log(
			`The balance of your account is ${balance}€ as of ${this.getDate()}.`
		)
		return balance
	}

	newDeposit(acc, amount) {
		const account = this.findAccount(acc)
		const transactionDate = this.getDate()

		if (!amount || amount === 0) {
			throw new Error("You must provide an amount for the deposit")
		}

		const transaction = {
			date: transactionDate,
			name: account.name,
			type: "deposit",
			amount: amount,
			transactionId: this.idGenerator(),
		}
		this.#transactions.push(transaction)
	}

	newWithdrawal(acc, amount) {
		const account = this.findAccount(acc)
		const transactionDate = this.getDate()

		if (!amount || amount === 0) {
			throw new Error("You must provide an amount for the withdrawal")
		}

		const currentBalance = this.checkBalance(acc)

		if (currentBalance < amount) {
			console.log(
				`There are not enough funds in your account for this transaction. The maximum amount that can be removed is €${currentBalance}`
			)
			throw new Error(
				`There are not enough funds in your account for this transaction. The maximum amount that can be removed is €${currentBalance}`
			)
		}

		const transaction = {
			date: transactionDate,
			name: account.name,
			type: "withdrawal",
			amount: amount,
			transactionId: this.idGenerator(),
		}
		this.#transactions.push(transaction)
		console.log(
			`€${amount} have been withdrawn from your account\n Your account balance is ${this.checkBalance(
				acc
			)}€.`
		)
	}
}


