import Transaction from "../src/Transaction";

class BankAccount {
    private transactions: Transaction[] = []
    private overDraftLimit: number = 0
    private static DEFAULT_OVERDRAFT_LIMIT = 500;

    private isValidTransaction(amount: number, date: Date): boolean {
        return amount > 0 && !isNaN(date.getTime())
    }

    public deposit(amount: number, date: Date = new Date()): boolean {
        if (!this.isValidTransaction(amount, date)) {
            return false;
        }
        this.transactions.push({ amount: amount, date: date })
        return true
    }

    public withdraw(amount: number, date: Date = new Date()): boolean {
        if (!this.isValidTransaction(amount, date) || this.calculateBalance() + this.overDraftLimit < amount) {
            return false;
        }
        this.transactions.push({ amount: -amount, date: date })
        return true
    }

    public enableOverDraft(): void {
        this.overDraftLimit = BankAccount.DEFAULT_OVERDRAFT_LIMIT;
    }

    private calculateBalance(): number {
        return this.transactions.reduce((balance: number, transaction: Transaction) => balance + transaction.amount, 0);
    }

    private formatTransaction(transaction: Transaction, currentBalance: number): string {
        const date = (transaction.date.getMonth() + 1) + '/' + transaction.date.getDate() + '/' +  transaction.date.getFullYear();
        const amount = transaction.amount > 0 ? transaction.amount.toString().padEnd(8) : ' '.repeat(9);
        const debit = transaction.amount < 0 ? transaction.amount.toString().padEnd(7) : ' '.repeat(8);
        return `${date.padEnd(11)}|| ${amount}|| ${debit}|| ${currentBalance}\n`;
    }

    public returnAccountHistory(transactions: Transaction[]): string {
        const result: string[] = []
        let balance: number = 0
        result.push("date       || credit  || debit  || balance\n");
    
        this.transactions.forEach((transaction: Transaction) => {
            balance += transaction.amount
            if(transactions.includes(transaction)) {
                let date = (transaction.date.getMonth()+1) + '/' + transaction.date.getDate() + '/' +  transaction.date.getFullYear();
                result.push(date.padEnd(11) + "||")
    
                if (transaction.amount > 0) {
                    result.push(" " + String(transaction.amount).padEnd(8))
                    result.push("||" + " ".repeat(8))
                } else {
                    result.push(" ".repeat(9) + "||")
                    result.push(" " + String(transaction.amount).padEnd(7))
                }
                result.push("|| " + String(balance))
                result.push("\n")
            }
        })
    
        return result.join("")
    }
        
    public showAccountHistory(): string {
        return this.returnAccountHistory(this.transactions)
    }

    public showAccountHistoryBetweenTwoDates(date1: Date, date2: Date): string {
        if(date1 > date2) return "Wrong dates"
        const transactionBetweenTwoDates: Transaction[] = []

        this.transactions.forEach((transaction: Transaction) => {
            if(transaction.date > date1 && transaction.date < date2)
                transactionBetweenTwoDates.push(transaction)
        })

        return this.returnAccountHistory(transactionBetweenTwoDates)
    }
}
export default BankAccount;
