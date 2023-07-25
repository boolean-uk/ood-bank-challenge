import { Transaction } from "./Transaction";

export class BankStatement {
    private statementId: string
    private accountNumber: string
    private transactions: Transaction[]
  
    constructor(statementId: string, accountNumber: string) {
      this.statementId = statementId
      this.accountNumber = accountNumber
      this.transactions = []
    }
  
    addTransaction(transaction: Transaction) {
      this.transactions.push(transaction)
    }
  
    getTransactions(): Transaction[] {
      return this.transactions
    }
  
    generateStatement(): string {
      let balance = 0.0
      let statement = "date       || credit  || debit  || balance\n";
  
      const sortedTransactions = this.transactions.sort((a, b) => a.getDate().getTime() - b.getDate().getTime())
  
      for (const transaction of sortedTransactions) {
        const amount = transaction.getAmount()
        balance += amount
        if (amount >= 0) {
          statement += `${this.formatDate(transaction.getDate())} || ${amount.toFixed(2)} ||         || ${balance.toFixed(2)}\n`
        } else {
          statement += `${this.formatDate(transaction.getDate())} ||         || ${(Math.abs(amount)).toFixed(2)} || ${balance.toFixed(2)}\n`
        }
      }
  
      return statement.trim()
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
      }

    
    //Extension 2: Get ordered transactions between two dates
    getOrderedStatements(startDate: Date, endDate: Date): Transaction[] {
    return this.transactions.filter((transaction) => transaction.getDate() >= startDate && transaction.getDate() <= endDate)
  }

    // Extension 3: Get all transactions after a specific date
    getTransactionsAfterDate(startDate: Date): Transaction[] {
    return this.transactions.filter((transaction) => transaction.getDate() >= startDate)
  }
    
    }
    