import {
    InvestmentAccount
} from '../src/investment_account'
import {
    type Account
} from '../src/account'

describe('InvestmentAccount', function () {
    // Mock the creation date for testing
    let creationDate: Date
    let account: Account

    beforeEach(() => {
        creationDate = new Date(2022, 0, 1)
        account = new InvestmentAccount(creationDate)
    })

    it('getBalance calculates balance with interest correctly', function () {
        account.deposit(1000)
        const now = new Date()

        // scenario 1
        let expectedBalance = 1040
        now.setFullYear(2022, 2, 1) // March 1, 2022    

        let actualBalance = account.getBalance(now)

        expect(actualBalance).toEqual(expectedBalance)

        // scenario 2
        expectedBalance = 1280
        now.setFullYear(2023, 2, 1); // March 1, 2023    

        actualBalance = account.getBalance(now)

        expect(actualBalance).toEqual(expectedBalance)
    })

})
