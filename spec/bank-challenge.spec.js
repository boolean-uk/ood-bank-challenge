const {Bank, Account, CreditTransaction, DebitTransaction, Transaction} = require('../src/bank-challenge.js')
  
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

    describe('deposit', () => {
        it('should add a credit transaction to the account with the given account number', () => {
          bank.createAccount(accountNumber)
    
          bank.deposit(accountNumber, 10, '10/01/2012')
    
          const account = bank.findAccount(accountNumber)
          expect(account.getTransactions().length).toEqual(1)
    
          const transaction = account.getTransactions()[0]
          expect(transaction instanceof CreditTransaction).toBe(true)
          expect(transaction.getAmount()).toEqual(10)
        })
    
        it('should log an error message when the account does not exist', () => {
          const spyConsole = spyOn(console, 'log')
    
          bank.deposit(accountNumber + 1, 10, '10/01/2012')
    
          expect(spyConsole).toHaveBeenCalledWith(`Account ${accountNumber + 1} not found.`)
        })
    })
})
  

  
