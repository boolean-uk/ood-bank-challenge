import { SavingAccount } from "./account";

export class AccountManager{
   
    
    constructor(){

    }


    createSavingAccount(accountNumber : string) : SavingAccount {
        let savingAccount : SavingAccount = new SavingAccount(accountNumber);
        return savingAccount;
    }


    

}