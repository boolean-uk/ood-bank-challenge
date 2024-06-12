export default class Transaction {
	#transactions
	#accounts
	constructor() {}



	deposit(account, amount, date, id ) {

		const newTransaction = {
			account,
			amount,
			date,
			id,
			type: "deposit",
		}
		return newTransaction
	}

	withdrawal(account, amount, date, id) {

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
