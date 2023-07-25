import {Transaction} from "./Transaction";
import {BankStatementGenerator} from "./BankStatementGenerator";

export class Account {
    private readonly accountOwner: string
    private readonly transactionHistory: Transaction[]

    constructor(accountOwner: string) {
        this.accountOwner = accountOwner
        this.transactionHistory = []
    }

    depositMoney(amountDeposited: number): boolean {
        if (amountDeposited < 0)  {
            return false
        }
        this.transactionHistory.push(new Transaction(amountDeposited, 'deposit'))
        return true;
    }

    withdrawMoney(amountWithdrawn: number): boolean {
        if (amountWithdrawn > this.calculateBalance()) {
            return false
        }
        this.transactionHistory.push(new Transaction(amountWithdrawn, 'withdrawal'))
        return true
    }

    calculateBalance(): number {
        let balance = 0;
        for (const transaction of this.transactionHistory) {
            balance += transaction.getType() === 'deposit' ? transaction.getAmount() : -transaction.getAmount()
        }
        return balance
    }

    addTransaction(addedTransaction: Transaction) {
        this.transactionHistory.push(addedTransaction)
    }

    generateBankStatement() {
        const bankStatementGenerator = new BankStatementGenerator();
        return bankStatementGenerator.generateBankStatement(this.getTransactionHistory());
    }

    getAccountOwner(): string {
        return this.accountOwner
    }

    getTransactionHistory(): Transaction[] {
        return this.transactionHistory
    }
}