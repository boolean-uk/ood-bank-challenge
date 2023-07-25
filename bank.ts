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

    formatTransactions(trasactionsToFormat : Array<Bank_Transaction>){
        let balance = 0;
        return trasactionsToFormat.map((bankTransaction) => {
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
    }

    getBankTransactionsList() {
        const formattedTransaction = this.formatTransactions(this.bankTransactionsList);
        console.table(formattedTransaction);
    }

    createTransactionListBetweenTimePeriod(startDate : Date, endDate : Date) {
        return this.bankTransactionsList.filter((bankTransaction) => {
            return bankTransaction.date >= startDate && bankTransaction.date <= endDate;
        });
    }

    getBankTransactionsListBetweenTimePeriod(startDate : Date, endDate : Date) {
    let balance = 0;
    
    const ListOfTransactionsBetweenTimePeriod = this.createTransactionListBetweenTimePeriod(startDate, endDate);

    const formattedTransaction = this.formatTransactions(ListOfTransactionsBetweenTimePeriod);

    console.table(formattedTransaction);
    }
}
