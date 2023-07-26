import { Bank } from "../Bank"
import { Transaction } from "../Transation"

describe("Bank tests", () => {
    let bank:Bank

    beforeEach(()=>{
        bank=new Bank()
    })
    it("should set saving account deposit", () => {
        bank.setSavingAccount(500)
        expect(500).toEqual(bank.getSavingAccount().amount)
    })
    it("should set saving account withdraw", () => {
        bank.setSavingAccount(500)
        bank.setSavingAccount(-300)
        expect(200).toEqual(bank.getSavingAccount().amount)
    })
    it("should set saving account withdraw too much", () => {
        bank.setSavingAccount(500)
        expect(() => bank.setSavingAccount(-700)).toThrow("");
    })
    it("should set current account deposit", () => {
       bank.setCurrentAccount(500)
        expect(500).toEqual(bank.getCurrentAccount().amount)
    })
    it("should set current account withdraw", () => {
       bank.setCurrentAccount(500)
       bank.setCurrentAccount(-300)
        expect(200).toEqual(bank.getCurrentAccount().amount)
    })
    it("should set current account withdraw too much", () => {
       bank.setCurrentAccount(500)
       expect(() => bank.setSavingAccount(-700)).toThrow("");
    })
    it("should make New Transaction", () => {
        const bank = new Bank();
        const bank1 = new Bank();
        
        bank.transactions.push(new Transaction(500, 'DEBIT'));
        bank.setCurrentAccount((500));
        expect(bank.generateTransactionsSummary(bank.transactions)).toEqual( bank1.makeNewTransaction((500), 'DEBIT'));
        
        bank.transactions.push(new Transaction((900), 'CREDIT'));
        bank.setSavingAccount((900));
        expect(bank.generateTransactionsSummary(bank.transactions)).toEqual( bank1.makeNewTransaction((900), 'CREDIT'));
        
        bank.transactions.push(new Transaction((-200), 'DEBIT'));
        bank.setCurrentAccount((-200));
        expect(bank.generateTransactionsSummary(bank.transactions)).toEqual(bank1.makeNewTransaction((-200), 'DEBIT'));
        
        expect(bank.getBalance()).toEqual( bank1.getBalance());
       //  expect(200).toEqual(bank.getCurrentAccount().amount)
     })
     it("should print record between two dates", () => {
        const bank = new Bank();
        const bank1 = new Bank();
        
        bank.transactions.push(new Transaction(500, 'DEBIT'));
        bank.setCurrentAccount((500));
        bank1.makeNewTransaction(500,'DEBIT')
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        bank.transactions[0].dateTime=yesterday
        bank1.transactions[0].dateTime=yesterday
        bank1.makeNewTransaction((500), 'DEBIT')
        bank.makeNewTransaction((500), 'DEBIT')
        expect(bank.generateTransactionsSummaryBetweenDates(yesterday,today)).toEqual( 
            bank1.generateTransactionsSummaryBetweenDates(yesterday,today));
            expect(bank.generateTransactionsSummaryBetweenDates(today,today)).toEqual( 
                bank1.generateTransactionsSummaryBetweenDates(today,today));
            
        bank.transactions.push(new Transaction((900), 'CREDIT'));
        bank.setSavingAccount((900));
        bank1.makeNewTransaction((900), 'CREDIT')
        expect(bank.generateTransactionsSummaryBetweenDates(today,yesterday)).toEqual( bank1.generateTransactionsSummaryBetweenDates(today,yesterday));
        
        bank.transactions.push(new Transaction((-200), 'DEBIT'));
        bank.setCurrentAccount((-200));
        bank1.makeNewTransaction(-200,'DEBIT')
        expect(bank.generateTransactionsSummaryBetweenDates(yesterday,yesterday)).toEqual(bank1.generateTransactionsSummaryBetweenDates(yesterday,yesterday));
        
        expect(bank.getBalance()).toEqual( bank1.getBalance());
       
     })
     it("should allow adding a 500 overdraft to the account", () => {
      
        expect(bank.currentAccount.overdraftLimit).toEqual(-400);
        bank.changeOverdraft(-500)
        expect(bank.currentAccount.overdraftLimit).toEqual(-500);
      
     })

     it("should not deposit over limits per year ",()=>{
        const bank=new Bank()
        bank.makeNewTransaction(19999,'CREDIT')
    
       expect(() => bank.makeNewTransaction(700,'CREDIT')).toThrow("The deposit goes over year limit on savings account!");
         const currentDate = new Date()
         bank.transactions[0].dateTime = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
       
         expect(bank.makeNewTransaction(700,'CREDIT')).toEqual(bank.generateTransactionsSummary(bank.transactions));
    })
    
})