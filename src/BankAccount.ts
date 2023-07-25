import Transaction from "./Transaction";
import * as os from 'os';

class BankAccount {
    private _transactions: Transaction[] = [];
    private _overDraftLimit: number = 0
    private static DEFAULT_OVERDRAFT_LIMIT = 500;

    public calculateBalance(): number {
        let balance: number = 0;
        this._transactions.forEach(transaction => {
            balance += transaction.amount;
        });
        return balance;
    }

    public get transactions(): Transaction[] {
        return this._transactions;
    }

    public enableOverdraft(): void {
        this._overDraftLimit = BankAccount.DEFAULT_OVERDRAFT_LIMIT;
    }

    public deposit(amount: number, date: Date): void {
        if (amount < 0) {
            throw new Error('You cannot deposit a negative amount');
        }
        const hour_minute = date.getHours() + ":" + date.getMinutes();

        const transaction = new Transaction(amount, this.calculateBalance() + amount, 
            date.toLocaleDateString('en-GB'), hour_minute);
        this._transactions.push(transaction);
    }

    public withdraw(amount: number, date: Date): void {
        if (amount < 0) {
            throw new Error('You cannot withdraw a negative amount');
        }
        if (amount > this.calculateBalance() + this._overDraftLimit) {
            throw new Error('You cannot withdraw more than your balance + overdraft limit');
        }

        const hour_minute = date.getHours() + ":" + date.getMinutes();
        const transaction = new Transaction(-amount, this.calculateBalance() - amount, 
            date.toLocaleDateString('en-GB'), hour_minute);
        this._transactions.push(transaction);
    }

    private sortTransactions(ascending: boolean): void {
        this._transactions.sort((a, b) => {
            const [day, month, year] = a.date.split("/");
            const dateA = new Date(Number(year), Number(month) - 1, Number(day));

            const [dayB, monthB, yearB] = b.date.split("/");
            const dateB = new Date(Number(yearB), Number(monthB) - 1, Number(dayB));

            const sortOrder = ascending ? 1 : -1;
    
            if (dateA.getTime() !== dateB.getTime()) {
                return sortOrder * (dateA.getTime() - dateB.getTime());
            }
    
            const [hoursA, minutesA] = a.hour_minute.split(":").map(Number);
            const [hoursB, minutesB] = b.hour_minute.split(":").map(Number);
    
            if (hoursA !== hoursB) {
                return sortOrder * (hoursA - hoursB);
            }
    
            return sortOrder * (minutesA - minutesB);
        });
    }

    private getCreditColumnLength(): number {
        let maxLength: number = 0;
        this.transactions.forEach(transaction => {
            if (transaction.amount > 0) {
                maxLength = Math.max(maxLength, transaction.amount.toFixed(2).length);
            }
        });
        return Math.max(maxLength + 2, 8);
    }

    private getDebitColumnLength(): number {
        let maxLength: number = 0;
        this.transactions.forEach(transaction => {
            if (transaction.amount < 0) {
                maxLength = Math.max(maxLength, (-transaction.amount).toFixed(2).length);
            }
        });
        return Math.max(maxLength + 2, 7);
    }

    private generateSingleTransactionString(transaction: Transaction, 
        creditColumnLength: number, debitColumnLength: number): string {
        let statement: string = transaction.date + " || ";
        if (transaction.amount > 0) {
            statement += transaction.amount.toFixed(2) + 
            " ".repeat(creditColumnLength - transaction.amount.toFixed(2).length - 1) + "||" +
                " ".repeat(debitColumnLength) + "|| ";
        } else {
            statement += " ".repeat(creditColumnLength - 2) + " || " + 
                (-transaction.amount).toFixed(2) + " ".repeat(debitColumnLength - 
                (-transaction.amount).toFixed(2).length - 1) + "|| ";
        }
        statement += transaction.balance.toFixed(2) + os.EOL;
        return statement;
    }

    

    public generateWholeStatement(): string {
        return this.generateStatementFromTo(new Date(0), new Date());
    }


    public generateStatementFromTo(from: Date, to: Date): string {
        this.sortTransactions(false);
        const creditColumnLength = this.getCreditColumnLength();
        const debitColumnLength = this.getDebitColumnLength();

        let statement: string = "date       || credit " + 
                    " ".repeat(creditColumnLength - 8) + "|| debit " + 
                    " ".repeat(debitColumnLength - 7) + "|| balance" + os.EOL;
        
        this.transactions.forEach(transaction => {
            const [day, month, year] = transaction.date.split("/");
            const date = new Date(Number(year), Number(month) - 1, Number(day));
            if (date >= from && date <= to) {
                statement += this.generateSingleTransactionString(
                    transaction, 
                    creditColumnLength, 
                    debitColumnLength);
            }
        });
        return statement;
    }
    

}

export default BankAccount;