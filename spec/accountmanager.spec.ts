import { AccountManager } from "../src/accountmanager";


describe("Account Manager tests", () => {
    let accountManager: AccountManager; 

    beforeEach(() => { // Before each "it" test, start with a new Accounnt Manager instance
        accountManager = new AccountManager();
    })
    
    it("Should create a new saving account", () => {
     

        //given
        let savingAccount =  accountManager.createSavingAccount("1234");
        //then
        expect(savingAccount.getAccountType()).toEqual('saving');
        expect(savingAccount.getAccountNumber()).toEqual('1234');
    })

    it("Should create a new Investment account", () => {
     

        //given
        let savingAccount =  accountManager.createInvestmentAccount("1234");
        //then
        expect(savingAccount.getAccountType()).toEqual('investment');
        expect(savingAccount.getAccountNumber()).toEqual('1234');
    })

    it("Should create a new Checking account", () => {
     

        //given
        let checkingAccount =  accountManager.createCheckingAccount("1234");
        //then
        expect(checkingAccount.getAccountType()).toEqual('checking');
        expect(checkingAccount.getAccountNumber()).toEqual('1234');
    })

    it("Should add deposit to account", () =>{

    })
})

    

  