export default class User {
    id: string
    firstName: string
    lastName: string
    accounts: Array<string>

    constructor(id: string, firstName: string, lastName: string) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.accounts = []
    }
}