import { v4 as uuidv4 } from "uuid"
import Transaction from "./transactions.js"
import Account from "./account.js"

export default class Bank {
	#accounts
	#transactions
	constructor(idGenerator = uuidv4) {
		this.idGenerator = uuidv4
		this.transaction = new Transaction()
		this.account = new Account()
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
		const existingAccountName = this.#accounts.find(
			(acc) => acc.owner === owner
		)
		if (existingAccountName) {
			throw new Error("An account with this name already exists")
		}
		// const account = this.account
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
		const totalDeposits = this.#transactions.reduce(
			(sum, transaction) => {
				if (
					transaction.type === "deposit" &&
					transaction.account === accountToCheck.owner
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
					transaction.account === accountToCheck.owner
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

		if (!amount || amount === 0) {
			throw new Error("You must provide an amount for the deposit")
		}
		const transaction = this.transaction.deposit(
			account.owner,
			amount,
			this.getDate(),
            this.idGenerator()
		)
		this.#transactions.push(transaction)
	}

	newWithdrawal(acc, amount) {
		const account = this.findAccount(acc)

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

		const transaction = this.transaction.withdrawal(
			account.owner,
			amount,
			this.getDate(),
			this.idGenerator()
		)
		this.#transactions.push(transaction)
		console.log(
			`€${amount} have been withdrawn from your account\n Your account balance is ${this.checkBalance(
				acc
			)}€.`
		)
	}
}

const nb = new Bank()
nb.createNewAccount("Perik")
// nb.createNewAccount("Erik")
nb.newDeposit("Perik", 10)
nb.newDeposit("Perik", 10)
// console.log(nb.getAccounts())

console.log(nb.findAccount("Perik"))
nb.newDeposit("Perik", 10)
console.log(nb.checkBalance("Perik"))
// nb.newWithdrawal("Perik", 11)

// nb.createNewAccount("Erik")
// nb.createNewAccount("Rick")
// console.log(nb.checkBalance("Perik"))
// nb.newDeposit("Erik", 10)
// nb.newDeposit("Rick", 10)
// console.log(nb.getAccounts())
// console.log(nb.checkBalance("Perik"))
// nb.newWithdrawal("Perik")
// console.log(nb.getAccounts());
// console.log(nb.getTransactions())
// nb.newDeposit(10)
// console.log(nb.checkBalance("Perik"))
// console.log(nb.getAccounts())

// // console.log(nb.accounts);
