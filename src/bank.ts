export class NormalAccount {
  balance: number;
  transactions: Transaction[];
  debit: number;
  constructor() {
    this.balance = 0;
    this.transactions = [];
    this.debit = -500;
  }

  deposit(amount: number): string {
    if (amount > 0) {
      this.balance += amount;
      let transaction = new Transaction(amount, true, this.balance);
      this.transactions.push(transaction);
      return "Transaction has been done properly";
    }
    return "Transaction has been declined!";
  }
  withdraw(amount: number): string {
    if (amount > 0) {
      if (this.balance - amount >= this.debit) {
        this.balance -= amount;
        let transaction = new Transaction(amount, false, this.balance);
        this.transactions.push(transaction);
        return "Transaction has been done properly";
      }
    }
    return "Transaction has been declined!";
  }

  createStatement(dateFrom: Date, dateTo: Date) {
    let dateFromCompare = dateFrom.getTime();
    let dateToCompare = dateTo.getTime();
    if(this.transactions.length==0)
    {
        return"Transaction list is empty!"
    }

    let statement = "   date    ||   credit  ||    debit  || balance\n";
    statement += "-------------------------------------------------\n";

    this.transactions.forEach((transaction) => {
      if (
        dateFromCompare <= transaction.date &&
        transaction.date <= dateToCompare
      ) {
        const credit: string = transaction.transactionType
          ? transaction.amount.toFixed(2)
          : "";
        const debit: string = !transaction.transactionType
          ? transaction.amount.toFixed(2)
          : "";
        statement += `${formatDate(transaction.date)} || ${credit.padStart(
          9
        )} || ${debit.padStart(9)} || ${transaction.balance
          .toFixed(2)
          .padStart(9)}\n`;
      }
    });
    return statement;
  }
   getAvailabeFunds():number {
    let availableFunds: number = 0
    this.transactions.forEach((transaction) =>{
        if(transaction.transactionType)
        {
            availableFunds+=transaction.amount
        }
        else{
            availableFunds-=transaction.amount
        }
    })
    return availableFunds
   }
}

export class Transaction {
  date: number;
  amount: number;
  transactionType: boolean;
  balance: number;
  constructor(amount: number, transactionType: boolean, balance: number) {
    this.date = Date.now();
    this.amount = amount;
    this.transactionType = transactionType;
    this.balance = balance;
  }
}

function formatDate(timestamp: number): string {
  const dateObj = new Date(timestamp);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}
