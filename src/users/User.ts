import Account from "../accounts/Account"
import UUID from "../utils/UUID"
import IUser from "./User.model"

export default class User implements IUser{

    id: string
    firstName: string
    lastName: string
    accounts: Account[]

    constructor(id: string, firstName: string, lastName: string) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.accounts = []

        this.accounts.push(new Account(UUID.forAccount(), "Checking", this.id))

    }
}