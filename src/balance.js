export default class Balance {
	constructor() {}

	checkBalance(acc, transactions) {
		const totalDeposits = transactions.reduce((sum, transaction) => {
			if (
				transaction.type === "deposit" &&
				transaction.account === acc.owner
			) {
				return sum + transaction.amount
			}
			return sum
		}, 0)
		const totalWithdrawals = transactions.reduce(
			(sum, transaction) => {
				if (
					transaction.type === "withdrawal" &&
					transaction.account === acc.owner
				) {
					return sum + transaction.amount
				}
				return sum
			},
			0
		)
		const balance = totalDeposits - totalWithdrawals
		return balance
	}
}
