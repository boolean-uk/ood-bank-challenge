import Account from "../accounts/Account"

export default interface IUser {
    id: string
    firstName: string
    lastName: string
    accounts: Array<Account>
}