export default class Transaction {
	constructor() {}

	deposit(account, amountInCents, date, id) {
		const amount = amountInCents / 100
		const newTransaction = {
			account,
			amount,
			date,
			id,
			type: "deposit",
		}
		return newTransaction
	}

	withdrawal(account, amountInCents, date, id) {
		const amount = amountInCents / 100
		const newTransaction = {
			account,
			amount,
			date,
			id,
			type: "withdrawal",
		}
		return newTransaction
	}
}
