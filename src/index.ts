import { Account } from "./account"

const credit: { [key: string]: number } = {}
const todaysDate = new Date()
const account = new Account()

const now = account.formatDate(todaysDate)
console.log(typeof now)
credit[now] = 2000
console.log(Object.keys(credit))

