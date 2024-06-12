import exp from "constants"
import { Account } from "../src/account.js"

describe('Account', () => {
    let account
    beforeEach(() => {
        account = new Account()
    })
    it('should create an account using their first and last name', () => {
        const result = new Account('Frank', 'Zappa')
        expect(result.firstName).toBe('Frank')
        expect(result.lastName).toBe('Zappa')
        expect(result.credit).toBe(0)
    })
})