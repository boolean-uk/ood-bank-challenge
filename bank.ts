import { Bank_Transaction } from "./bankTransaction";

export class Bank{
    bankTransactionsList : Array<Bank_Transaction> = [];

    addFunds(fundsToAdd : number){
        if(fundsToAdd < 0)
            throw new Error("Funds number cannot be negative");
        
        this.bankTransactionsList.push(new Bank_Transaction(new Date(), "credit", fundsToAdd));
    }

    getFunds(fundsToGet : number){
        let fundsAfterTransaction = this.getBalance() - fundsToGet

        if(fundsAfterTransaction < 0)
            throw new Error("Balance after transaction would be negative");

        this.bankTransactionsList.push(new Bank_Transaction(new Date(), "debit", fundsToGet));
    }

    getBalance(){
         return Array.from(this.bankTransactionsList).reduce((accumulator, currentValue) => {
            if(currentValue.transactionType == "credit")
                return accumulator + currentValue.amount;
            else
                return accumulator - currentValue.amount;
        }, 0);
    }
}