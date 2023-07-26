export class Transaction {
    date: Date
    amount: number
    balance: number
    type: 'deposit' | 'withdrawal'; // Add a 'type' property with allowed values 'deposit' or 'withdrawal'
  
    constructor(date: Date, amount: number, balance: number, type: 'deposit' | 'withdrawal') {
      this.date = date
      this.amount = amount
      this.balance = balance
      this.type = type; // Set the 'type' property during transaction creation
    }
  }
  
  export class BankAccount {
    transactions: Transaction[]
  
    constructor() {
      this.transactions = []
    }
  
    deposit(amount: number, date: Date): void {
      const balance = this.calculateBalance() + amount;
      this.transactions.push(new Transaction(date, amount, balance, 'deposit'))
    }
  
    withdraw(amount: number, date: Date): void {
      const balance = this.calculateBalance() - amount;
      this.transactions.push(new Transaction(date, -amount, balance, 'withdrawal'))
    }
  
    calculateBalance(): number {
      return this.transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
    }
  
    printStatement(): void {
      console.log("date       || credit  || debit  || balance");
      this.transactions
        .slice()
        .reverse()
        .forEach((transaction) => {
          const dateStr = this.formatDate(transaction.date)
          const credit = transaction.type === 'deposit' ? transaction.amount.toFixed(2) : ''
          const debit = transaction.type === 'withdrawal' ? (-transaction.amount).toFixed(2) : ''
          const balance = transaction.balance.toFixed(2);
          console.log(`${dateStr} || ${credit} || ${debit} || ${balance}`)
        });
    }
  
    private formatDate(date: Date): string {
      const day = String(date.getDate()).padStart(2, "0")
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    }
  }
  