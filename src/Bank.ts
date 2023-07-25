import { CurrentAccount } from "./CurrentAccount";
import { SavingAccount } from "./SavingAccount";
import { Transaction, accountType } from "./Transation";

export class Bank{
    currentAccount:CurrentAccount
    savingAccount:SavingAccount
    transactions:Transaction[]
    constructor(){
        this.currentAccount=new CurrentAccount(0)
        this.savingAccount=new SavingAccount(0)
        this.transactions=[]
    }
    getCurrentAccount():CurrentAccount{
        return this.currentAccount
    }
    getSavingAccount():SavingAccount{
        return this.savingAccount
    }
    setSavingAccount(number:number){
        
    }
    setCurrentAccount(number:number){

    }
    makeNewTransaction(amount:number,type:accountType):string{
        return ''
    }
    getBalance():number{
        return 0
    }
    generateTransactionsSummary():string{
        return ''
    }
}