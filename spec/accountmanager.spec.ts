import { AccountManager } from "../src/accountmanager";


describe("Account Manager tests", () => {
    let accountManager: AccountManager; 

    beforeEach(() => { // Before each "it" test, start with a new Accounnt Manager instance
        accountManager = new AccountManager();
    })
    
    it("Create a new saving account", () => {
     

        //given
        let savingAccount =  accountManager.createSavingAccount();
        //then
        expect(savingAccount.getType()).toEqual('saving');
    })
  
})

    

  