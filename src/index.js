import { v4 as uuidv4 } from "uuid"
import Transaction from "./transactions.js"
import Account from "./account.js"
import Statement from "./createStatement.js"
import Balance from "./balance.js"

export default class Bank {
	#accounts
	#transactions
	constructor(idGenerator = uuidv4) {
		this.idGenerator = uuidv4
		this.transaction = new Transaction()
		this.account = new Account()
        this.statement = new Statement()
        this.balance = new Balance()
		this.#accounts = []
		this.#transactions = []
	}
	getAccounts() {
		return [...this.#accounts]
	}
	getTransactions() {
		return [...this.#transactions]
	}

	getDate() {
		const d = new Date()
		const day = d.getDate().toString().padStart(2, "0")
		const month = (d.getMonth() + 1).toString().padStart(2, "0")
		const year = d.getFullYear()
		const hours = d.getHours().toString().padStart(2, "0")
		const minutes = d.getMinutes().toString().padStart(2, "0")
		const seconds = d.getSeconds().toString().padStart(2, "0")

		let currentdate = `${day}/${month}/${year}--${hours}:${minutes}:${seconds}`
		return currentdate
	}

	createNewAccount(owner) {
		if (!owner) {
			throw new Error(
				"You must provide the owner's name to create a new account"
			)
		}
		if (this.#accounts.find((acc) => acc.owner === owner)) {
			throw new Error("An account with this name already exists")
		}

		const newAccount = this.account.createAccount(
			owner,
			this.idGenerator(),
			this.getDate()
		)
		this.#accounts.push(newAccount)
	}

	findAccount(account) {
		if (!account) {
			throw new Error(
				"You must provide an account name for this transaction"
			)
		}
		const getByName = this.#accounts.find(
			(acc) => acc.owner === account
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
        return this.balance.checkBalance(
					accountToCheck,
					this.getTransactions()
				)
        }

	createNewStatemennt(acc) {
		if (!acc) {
			throw new Error(
				"An account name must be provided in order to print the statement"
			)
		}
		const accountToCheck = this.findAccount(acc)
		const filteredTransactions = this.getTransactions().filter(
			(tr) => tr.account === acc
		)
		return this.statement.createStatemennt(acc, filteredTransactions)
	}

	newDeposit(acc, amount) {
		const account = this.findAccount(acc)

		if (!amount || amount === 0) {
			throw new Error("You must provide an amount for the deposit")
		}
		const amountInCents = Math.round(amount * 100)
		const transaction = this.transaction.deposit(
			account.owner,
			amountInCents,
			this.getDate(),
			this.idGenerator()
		)
		this.#transactions.push(transaction)
	}

	newWithdrawal(acc, amount) {
		if (!amount || amount === 0) {
			throw new Error("You must provide an amount for the withdrawal")
		}
		const account = this.findAccount(acc)
		const currentBalance = this.checkBalance(acc)
		const amountInCents = Math.round(amount * 100)

		if (currentBalance < amount) {
			throw new Error(
				`Not enough funds in your account for this transaction. Max withdrawal amount is €${currentBalance}`
			)
		}

		const transaction = this.transaction.withdrawal(
			account.owner,
			amountInCents,
			this.getDate(),
			this.idGenerator()
		)
		this.#transactions.push(transaction)
	}
}
