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


export class Bank {
  transactions: Transaction[] = [];

  deposit(amount: number, date: string) {
    const transaction = new Transaction(date, amount, 'credit');
    this.transactions.push(transaction);
  }

  withdraw(amount: number, date: string) {
    const transaction = new Transaction(date, amount, 'debit');
    this.transactions.push(transaction);
  }

  formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  printStatement() {
    let balance = 0;
    console.log('date       || credit  || debit  || balance');

    this.transactions.reverse().forEach((transaction) => {
      const { date, amount, type } = transaction;
      if (type === 'credit') {
        balance += amount;
        console.log(`${this.formatDate(date)} || ${amount.toFixed(2)} ||        || ${balance.toFixed(2)}`);
      } else {
        balance -= amount;
        console.log(`${this.formatDate(date)} ||         || ${amount.toFixed(2)} || ${balance.toFixed(2)}`);
      }
    });
  }
}

const bank = new Bank();
bank.deposit(1000, '2012-01-10');
bank.deposit(2000, '2012-01-13');
bank.withdraw(500, '2012-01-14');
bank.printStatement();