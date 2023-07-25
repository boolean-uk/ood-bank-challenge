

export class Transaction {
    date: string;
    amount: number;
    type: 'credit' | 'debit';
  
    constructor(date: string, amount: number, type: 'credit' | 'debit') {
      this.date = date;
      this.amount = amount;
      this.type = type;
    }
  }
  
  export class StatementFormatter {
    static format(transactions: Transaction[]): string {
      let balance = 0;
      let statement = 'date       || credit  || debit  || balance\n';
  
      for (const transaction of transactions) {
        let credit = '         ';
        let debit = '        ';
  
        if (transaction.type === 'credit') {
          balance += transaction.amount;
          credit = transaction.amount.toFixed(2);
        } else {
          balance -= transaction.amount;
          debit = transaction.amount.toFixed(2);
        }
  
        statement += `${transaction.date} || ${credit} || ${debit} || ${balance.toFixed(2)}\n`;
      }
  
      return statement.trim();
    }
  }
  
  export class BankAccount {
    transactions: Transaction[];
  
    constructor() {
      this.transactions = [];
    }
  
    deposit(date: string, amount: number) {
      this.transactions.push(new Transaction(date, amount, 'credit'));
    }
  
    withdraw(date: string, amount: number) {
      this.transactions.push(new Transaction(date, amount, 'debit'));
    }
  
    printStatement(): string {
      const sortedTransactions = this.transactions.slice().sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime(); 
      });
  
      let balance = 0;
      let statement = 'date       || credit  || debit  || balance\n';
  
      for (const transaction of sortedTransactions) {
        let credit = '         ';
        let debit = '       ';
  
        if (transaction.type === 'credit') {
          balance += transaction.amount;
          credit = transaction.amount.toFixed(2);
        } else {
          balance -= transaction.amount;
          debit = transaction.amount.toFixed(2);
        }
  
        statement += `${transaction.date} || ${credit} || ${debit} || ${balance.toFixed(2)}\n`;
      }
  
      return statement.trim();
    }
  }
  
  
  
  
  