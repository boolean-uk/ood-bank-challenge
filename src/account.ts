import { Transaction } from "./transaction";

export class Account{
    private transactions: Transaction[] = [];
    private maxOverdraft: number = 0;

    deposit(date:Date, amount:number): void{
        const transaction = new Transaction(date, amount, true, true);
        this.transactions.push(transaction);
    }

    withdraw(date:Date, amount:number): void{
        const transaction = new Transaction(date, amount, false, false);
        if (this.getBalance() - transaction.getAmount() >= this.maxOverdraft){
            transaction.accepted = true
        }
        this.transactions.push(transaction);
    }

    getBalance(): number {
        return this.transactions.filter((t) => t.accepted).reduce((balance, transaction) => {
            return transaction.isDepositTransaction() ? balance + transaction.getAmount() : balance - transaction.getAmount();
          }, 0);
    }

    getBalanceBetween(startDate: Date, endDate: Date): number{
        return -1;
    }

    getTransactions(): Transaction[] {
        return this.transactions;
      }

}

export class BankStatement{
    account: Account;
    constructor(account: Account) {
        this.account = account;
      }

    printStatement(): string{
        let statement = 'date       || credit  || debit  || balance\n';
        statement += '=======================================\n';
        let balance = 0;

        for (const transaction of this.account.getTransactions()) {
        if (transaction.isDepositTransaction()) {
            balance += transaction.getAmount();
        } else {
            balance -= transaction.getAmount();
        }

        const date = this.formatDate(transaction.getDate());
        const credit = transaction.isDepositTransaction() ? transaction.getAmount().toFixed(2) : '';
        const debit = !transaction.isDepositTransaction() ? transaction.getAmount().toFixed(2) : '';
        const formattedBalance = balance.toFixed(2);

        statement += `${date} || ${credit.padStart(7)} || ${debit.padStart(6)} || ${formattedBalance}\n`;
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


// const bankAccount = new Account();
// bankAccount.deposit(new Date('2012-01-10'), 1000);
// bankAccount.deposit(new Date('2012-01-10'), 1000);
// bankAccount.withdraw(new Date('2012-01-14'), 500);
// const bankStatement = new BankStatement(bankAccount);
// console.log(bankStatement.printStatement())
