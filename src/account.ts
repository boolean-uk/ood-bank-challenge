import { Transaction } from "./transaction";

export class Account{
    private transactions: Transaction[] = [];
    private maxOverdraft: number = 0;

    deposit(date:Date, amount:number): void{
        if (amount > 0){
        const transaction = new Transaction(date, amount, true, true);
        this.transactions.push(transaction);
        this.sortTransactionsByDate();}
    }

    withdraw(date:Date, amount:number): void{
        if (amount>0){
        const transaction = new Transaction(date, amount, false, false);
        if (this.getBalance() - transaction.getAmount() >= this.maxOverdraft){
            transaction.accepted = true
        }
        this.transactions.push(transaction);
        this.sortTransactionsByDate();}
    }

    getBalance(): number {
        return this.roundUpToTwoDecimalPlaces(this.transactions.filter((t) => t.accepted).reduce((balance, transaction) => {
            return transaction.isDepositTransaction() ? balance + transaction.getAmount() : balance - transaction.getAmount();
          }, 0));
    }

    getBalanceTo(endDate: Date): number{
        return this.roundUpToTwoDecimalPlaces(this.transactions.filter((t) => t.accepted && t.getDate().getTime() <= endDate.getTime())
        .reduce((balance, transaction) => {
            return transaction.isDepositTransaction() ? balance + transaction.getAmount() : balance - transaction.getAmount();
          }, 0));
    }

    getTransactions(): Transaction[] {
        return this.transactions;
      }

    allowOverdraft(amount: number){
        this.maxOverdraft = Math.min(0-amount, 0);
    }

    getMaxOverdraft(): number{
        return this.maxOverdraft;
    }

    private sortTransactionsByDate(){
        this.transactions.sort((a, b) => a.getDate().getTime() - b.getDate().getTime());
    }

    private roundUpToTwoDecimalPlaces(number: number): number {
        const roundedNumber = Math.ceil(number * 100) / 100;
        return roundedNumber;
      }

}

export class BankStatement{
    account: Account;
    constructor(account: Account) {
        this.account = account;
      }

    printStatement(): string{
        let statement = 'date       ||  credit    ||   debit    ||    balance\n';
        statement += '=======================================\n';
        let balance = 0;

        for (const transaction of this.account.getTransactions()) {
            if (transaction.accepted){
                if (transaction.isDepositTransaction() ) {
                    balance += transaction.getAmount();
                } else {
                    balance -= transaction.getAmount();}
                }

        const date = this.formatDate(transaction.getDate());
        const credit = transaction.isDepositTransaction() ? transaction.getAmount().toFixed(2) : '';
        const debit = !transaction.isDepositTransaction() ? transaction.getAmount().toFixed(2) : '';
        const formattedBalance = balance.toFixed(2);

        statement += `${date} || ${credit.padStart(10)} || ${debit.padStart(10)} || ${formattedBalance.padStart(10)}\n`;
        }

        return statement;
        }

    generateStatement(startDate: Date, endDate:Date): string{
        let statement = 'date       ||  credit    ||   debit    ||    balance\n';
        statement += '=======================================\n';
        const previousDay = new Date(startDate);
        previousDay.setDate(startDate.getDate() - 1);
        let balance = this.account.getBalanceTo(previousDay);

        const transactionList =  this.account.getTransactions().filter((t) => t.getDate().getTime() >= startDate.getTime() && t.getDate().getTime() <= endDate.getTime())


        for (const transaction of transactionList) {
            if (transaction.accepted){
                if (transaction.isDepositTransaction() ) {
                    balance += transaction.getAmount();
                } else {
                    balance -= transaction.getAmount();}
                }

        const date = this.formatDate(transaction.getDate());
        const credit = transaction.isDepositTransaction() ? transaction.getAmount().toFixed(2) : '';
        const debit = !transaction.isDepositTransaction() ? transaction.getAmount().toFixed(2) : '';
        const formattedBalance = balance.toFixed(2);

        statement += `${date} || ${credit.padStart(10)} || ${debit.padStart(10)} || ${formattedBalance.padStart(10)}\n`;
        }

        return statement;
        }

    private formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
}


const bankAccount = new Account();
bankAccount.deposit(new Date('2012-01-10'), 1000);
bankAccount.deposit(new Date('2012-01-10'), 1000);
bankAccount.withdraw(new Date('2012-01-14'), 500);
const bankStatement = new BankStatement(bankAccount);
console.log(bankStatement.printStatement())

bankAccount.deposit(new Date('2012-01-13'), 2000);
bankAccount.withdraw(new Date('2012-01-14'), 500);
bankAccount.withdraw(new Date('2012-01-15'), 500);


const actualStatement = bankStatement.generateStatement(new Date('2012-01-13'), new Date('2012-01-14'));

console.log(actualStatement)
