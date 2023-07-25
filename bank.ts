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

    getBankTransactionsList() {
        let balance = 0;
        const formattedTransactions = this.bankTransactionsList.map((bankTransaction) => {
          const transactionDate =
            bankTransaction.date.getDate() +
            "/" +
            (bankTransaction.date.getMonth() + 1) + 
            "/" +
            bankTransaction.date.getFullYear();
    
          let formattedTransaction = {
            date: transactionDate,
            credit: "",
            debit: "",
            balance: "",
          };
    
          if (bankTransaction.transactionType === "credit") {
            balance += bankTransaction.amount;
            formattedTransaction.credit = bankTransaction.amount.toFixed(2);
          } else {
            balance -= bankTransaction.amount;
            formattedTransaction.debit = bankTransaction.amount.toFixed(2);
          }
    
          formattedTransaction.balance = balance.toFixed(2);
          return formattedTransaction;
        });
    
        console.table(formattedTransactions);
      }
}