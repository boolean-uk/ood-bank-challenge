const {Bank, Account, DebitTransaction, CreditTransaction, Transaction} = require('../src/bank-challenge.js')
  
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

    describe('withdraw', () => {
        beforeEach(() => {
          bank.createAccount(accountNumber)
          bank.deposit(accountNumber, 10, '10/01/2012')
        })
    
        it('should add a debit transaction to the account with the given account number if there is sufficient balance', () => {
          bank.withdraw(accountNumber, 5, '14/01/2012')
    
          const account = bank.findAccount(accountNumber)
          expect(account.getTransactions().length).toEqual(2)
    
          const transaction = account.getTransactions()[1]
          expect(transaction instanceof DebitTransaction).toBe(true)
          expect(transaction.getAmount()).toEqual(5)
        })
    
        it('should log an error message when the account does not exist', () => {
          const spyConsole = spyOn(console, 'log')
    
          bank.withdraw(accountNumber + 1, 5, '14/01/2012')
    
          expect(spyConsole).toHaveBeenCalledWith(`Account ${accountNumber + 1} not found.`)
        })
    
        it('should log an error message when there is insufficient balance', () => {
          const spyConsole = spyOn(console, 'log')
    
          bank.withdraw(accountNumber, 15, '14/01/2012')
    
          expect(spyConsole).toHaveBeenCalledWith('Insufficient balance.')
        })
    })
    
    describe('parseDate', () => {
        it('should parse the date string to a Date object', () => {
          const date = bank.parseDate('10/01/2012')
          expect(date instanceof Date).toBe(true)
          expect(date.getFullYear()).toEqual(2012)
          expect(date.getMonth()).toEqual(0) 
          expect(date.getDate()).toEqual(10)
        })
    })
    
    describe('findAccount', () => {
        it('should return the account with the given account number', () => {
          bank.createAccount(accountNumber)
    
          const account = bank.findAccount(accountNumber)
    
          expect(account.getAccountNumber()).toEqual(accountNumber)
        })
    
        it('should return undefined when the account does not exist', () => {
          const account = bank.findAccount(accountNumber)
    
          expect(account).toBeUndefined()
        })
    })
    describe('printStatement', () => {
        beforeEach(() => {
          bank.createAccount(accountNumber)
          bank.deposit(accountNumber, 10, '10/01/2012')
          bank.withdraw(accountNumber, 5, '14/01/2012')
        })
    
        it('should log the statement for the account with the given account number', () => {
          const spyConsole = spyOn(console, 'log')
    
          bank.printStatement(accountNumber)
    

          expect(spyConsole.calls.argsFor(0)[0]).toContain('date\t\t|| credit\t|| debit\t|| balance')
        })
    
        it('should log an error message when the account does not exist', () => {
          const spyConsole = spyOn(console, 'log')
    
          bank.printStatement(accountNumber + 1)
    
          expect(spyConsole).toHaveBeenCalledWith(`Account ${accountNumber + 1} not found.`)
        })
    })

    describe('Account', () => {
        let account;
        let accountNumber;
      
        beforeEach(() => {
          accountNumber = 123456789;
          account = new Account(accountNumber);
        });
      
        describe('getAccountNumber', () => {
          it('should return the account number', () => {
            expect(account.getAccountNumber()).toEqual(accountNumber);
          });
        });
      
        describe('getBalance', () => {
          it('should return the current balance of the account', () => {
            expect(account.getBalance()).toEqual(0);
      
            account.addTransaction(new CreditTransaction(new Date(), 100));
      
            expect(account.getBalance()).toEqual(100);
      
            account.addTransaction(new DebitTransaction(new Date(), 50));
      
            expect(account.getBalance()).toEqual(50);
          });
        });
      
        describe('addTransaction', () => {
          it('should add the transaction to the account', () => {
            account.addTransaction(new CreditTransaction(new Date(), 100));
      
            expect(account.getTransactions().length).toEqual(1);
      
            const transaction = account.getTransactions()[0];
            expect(transaction instanceof CreditTransaction).toBe(true);
            expect(transaction.getAmount()).toEqual(100);
          });
        });
      
        describe('getTransactions', () => {
          it('should return the list of transactions for the account', () => {
            expect(account.getTransactions().length).toEqual(0);
      
            account.addTransaction(new CreditTransaction(new Date(), 100));
            account.addTransaction(new DebitTransaction(new Date(), 50));
      
            expect(account.getTransactions().length).toEqual(2);
          });
        });
    });
})
  

  
