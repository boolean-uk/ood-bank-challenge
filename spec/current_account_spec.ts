import {
    CurrentAccount
} from '../src/current_account'
import {
    type Account
} from '../src/account'

describe('CurrentAccount', function () {
    let account: Account

    beforeEach(() => {
        account = new CurrentAccount()
    })

    it('withdraw allows to withdraw overdraft when allowed', function () {
        if (account instanceof CurrentAccount)
            account.approveOverdraft()

        account.withdraw(CurrentAccount.OVERDRAFT)

        expect(account.getBalance()).toEqual(CurrentAccount.OVERDRAFT * -1)
    })

    it('withdraw does not allow to withdraw overdraft when not allowed', function () {
        expect(() => account.withdraw(CurrentAccount.OVERDRAFT)).toThrow()
    })
})
