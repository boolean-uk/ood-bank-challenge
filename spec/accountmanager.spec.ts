import { AccountManager } from "../src/accountmanager";


describe("Account Manager tests", () => {
    let accountManager: AccountManager; 

    beforeEach(() => { // Before each "it" test, start with a new Accounnt Manager instance
        accountManager = new AccountManager();
    })
    
    it("Should create a new saving account", () => {
     

        //when
        let savingAccount =  accountManager.createSavingAccount("1234");
        //then
        expect(savingAccount.getAccountType()).toEqual('saving');
        expect(savingAccount.getAccountNumber()).toEqual('1234');
    })

    it("Should create a new Investment account", () => {
     

        //when
        let savingAccount =  accountManager.createInvestmentAccount("1234");
        //then
        expect(savingAccount.getAccountType()).toEqual('investment');
        expect(savingAccount.getAccountNumber()).toEqual('1234');
    })

    it("Should create a new Checking account", () => {
     

        //when
        let checkingAccount =  accountManager.createCheckingAccount("1234");
        //then
        expect(checkingAccount.getAccountType()).toEqual('checking');
        expect(checkingAccount.getAccountNumber()).toEqual('1234');
    })

    it("Should return blanace of the account", () =>{
        //given
        let checkingAccount =  accountManager.createCheckingAccount("1234");
        let deposit: number = 5000;

        //when
        accountManager.addDeposit(checkingAccount, deposit);
        accountManager.addDeposit(checkingAccount, deposit);
        accountManager.addDeposit(checkingAccount, deposit);
        accountManager.addDeposit(checkingAccount, deposit);
        accountManager.addDeposit(checkingAccount, deposit);
        accountManager.addDeposit(checkingAccount, deposit);

        //then
        expect(checkingAccount.getBalance()).toEqual(30000);
    })

    it("Should add deposit to account", () =>{
        //given
        let checkingAccount =  accountManager.createCheckingAccount("1234");
        let deposit: number = 5000;
        //when
        accountManager.addDeposit(checkingAccount, deposit);
        accountManager.addDeposit(checkingAccount, 10000);

        //then
        expect(checkingAccount.getBalance()).toEqual(15000);
    })

    
    it("Should withdraw amount of money from the account", () =>{
        //given
        let checkingAccount =  accountManager.createCheckingAccount("1234");
        let deposit: number = 5000;
        accountManager.addDeposit(checkingAccount, deposit);
        accountManager.addDeposit(checkingAccount, 10000);
        //when
        accountManager.withdraw(checkingAccount, 8000)

        //then
        expect(checkingAccount.getBalance()).toEqual(7000);
    })

    it("Should return bank statement", () =>{
        //given
        let checkingAccount =  accountManager.createCheckingAccount("1234");
        let deposit: number = 5000;
        accountManager.addDeposit(checkingAccount, deposit);
        accountManager.addDeposit(checkingAccount, 10000);
        accountManager.withdraw(checkingAccount, 8000)
        accountManager.withdraw(checkingAccount, 3000)

        let statement : string = accountManager.getBankStatement();
        
        expect(statement).toEqual("aaaaaaa"); 
    })





})

    

  