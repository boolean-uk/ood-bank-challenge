// Account Types: Savings, Investment, Checking
import { v4 as uuidv4 } from "uuid"

export default class Account {
    constructor(owner, type = 'Checking') {
        this.owner = owner
        this.type = type
    }

    createAccount(owner,id,dateCreated){
        const newAccount = {
            owner,
            id,
            dateCreated,
        }
        return newAccount
    }
}