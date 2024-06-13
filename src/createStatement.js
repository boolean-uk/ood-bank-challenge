export default class Statement {
	constructor() {}
	createStatemennt(acc, transactions) {
		const statementMap = new Map()
		let currentBalance = 0

		transactions.forEach((transaction) => {
			const uniqueKey = transaction.id
			if (transaction.type === "deposit") {
				currentBalance += transaction.amount
				statementMap.set(uniqueKey, {
					type: transaction.type,
					date: transaction.date,
					credit: transaction.amount.toFixed(2),
					debit: "",
					balance: currentBalance.toFixed(2),
				})
			} else if (transaction.type === "withdrawal") {
				currentBalance -= transaction.amount
				statementMap.set(uniqueKey, {
					type: transaction.type,
					date: transaction.date,
					credit: "",
					debit: transaction.amount.toFixed(2),
					balance: currentBalance.toFixed(2),
				})
			}
		})
		const sortedTransactions = Array.from(statementMap.values()).sort(
			(a, b) => new Date(b.date) - new Date(a.date)
		)
		let statement =
			"date                || credit      || debit    || balance\n"
		sortedTransactions.forEach((transaction) => {
			statement += `${
				transaction.date
			} || ${transaction.credit.padStart(
				11
			)} || ${transaction.debit.padStart(
				8
			)} || ${transaction.balance.padStart(8)}\n`
		})

		return statement
	}
}
