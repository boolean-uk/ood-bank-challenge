// Account Types: Savings, Investment, Checking
export default class Account {
	constructor(owner, type = "checking") {
		this.owner = owner
		this.type = type
	}

	createAccount(owner, accType, id, dateCreated) {
		const newAccount = {
			owner,
			id,
			dateCreated,
			accType,
		}
		return newAccount
	}
}