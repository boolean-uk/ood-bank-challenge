const Account = require('../src/account.js')
const Bank = require('../src/bank.js')
const Printer = require('../src/printer.js')

describe('Bank', () => {
    let bank

    beforeEach(() => {
        bank = new Bank()
    })

    it('the bank can open a new account', () => {
        const expected = new Account(1)
        const result = bank.openAccount()
        expect(result).toEqual(expected)
    })
})