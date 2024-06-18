const {Bank, Account} = require('../src/bank-challenge.js')
  
  describe('Bank', () => {
    let bank
    let accountNumber
  
    beforeEach(() => {
      bank = new Bank()
      accountNumber = 123456789
    })
  
    describe('createAccount', () => {
      it('should create a new account with the given account number', () => {
        const account = bank.createAccount(accountNumber)
  
        expect(account.getAccountNumber()).toEqual(accountNumber)
      })
  
      it('should add the created account to the accounts list', () => {
        const account = bank.createAccount(accountNumber)
  
        expect(bank.accounts).toContain(account)
      })
    })
})
  
