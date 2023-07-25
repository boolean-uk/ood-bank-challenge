import { Account, CheckingAccount, InvestmentAccount, SavingAccount, Transaction } from "./account";

export class AccountManager{
  
  
   
    
    constructor(){

    }


    createSavingAccount(accountNumber : string) : SavingAccount {
        let savingAccount : SavingAccount = new SavingAccount(accountNumber);
        return savingAccount;
    }

    createInvestmentAccount(accountNumber: string): InvestmentAccount {
        let investmentAccount : InvestmentAccount = new InvestmentAccount(accountNumber);
        return investmentAccount;
    }

    createCheckingAccount(accountNumber: string): CheckingAccount {
        let checkingAccount : CheckingAccount = new CheckingAccount(accountNumber);
        return checkingAccount;
    }
   
    addDeposit(account: Account, deposit: number) {
        if(deposit > 0){
        account.addTransaction(new Transaction(deposit, account.getBalance()+deposit));
        }else console.log("You can not deposit amount of money below zero!")
    }

    

}