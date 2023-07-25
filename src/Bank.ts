import { Account } from "./Account";

export class Bank extends Account{
    

    transactionType(transactionType : boolean){
        if (transactionType === true){
            return '    Deposit     '
        }
        else if(transactionType === false){
            return '   Withdrawal   '
        }
    }
    printStatement(){
        console.log('   Date   || Transaction type || Amount || Total balance')
        const balanceHistory = this.getBalanceHistory()
        for (let i = 0; i < balanceHistory.length; i++){
            console.log(balanceHistory[i][0]+" || "+ this.transactionType(balanceHistory[i][1]) +" || £ "+ balanceHistory[i][2]+ " ||    £ "+ this.balanceAfterEachTransaction(i))
        }

    }
}