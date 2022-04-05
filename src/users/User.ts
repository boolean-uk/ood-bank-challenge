import IUser from "./IUser.model"

export default class User implements IUser{

    id: string
    firstName: string
    lastName: string
    accounts: string[]

    constructor(id: string, firstName: string, lastName: string) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.accounts = []
    }
}