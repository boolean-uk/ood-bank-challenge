// Account Types: Savings, Investment, Checking
export default class Account {
	constructor(owner, type = "checking") {
		this.owner = owner
		this.type = type
	}

	createAccount(owner, type, id, dateCreated) {
		type = this.type
		const newAccount = {
			owner,
			id,
			dateCreated,
			type,
		}
		return newAccount
	}
}