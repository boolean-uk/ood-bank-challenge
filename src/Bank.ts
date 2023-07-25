export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
}

interface Transaction {
  type: TransactionType;
  amount: number;
  date: Date;
}

export class Bank {
  private transactions: Transaction[] = [];
  private balance: number = 0;

  public deposit(amount: number, date: Date): boolean {
    if (amount <= 0) return false;

    const transaction: Transaction = {
        type: TransactionType.DEPOSIT,
        amount,
        date,
      };
      this.balance += amount;
      this.transactions.push(transaction);
      return true;
  }

  public withdraw(amount: number, date: Date): boolean {
    if (amount <= 0 || this.balance < amount) return false;

    const transaction: Transaction = {
        type: TransactionType.WITHDRAWAL,
        amount,
        date,
      };
      this.balance -= amount;
      this.transactions.push(transaction);
      return true;
  }

  public showAccountHistory(): string {
    let result = "date        || credit    || debit     || balance\n";
    let balance = 0;
    for (const transaction of this.transactions) {
      const { date, amount, type } = transaction;
      const formattedDate = date.toLocaleDateString().padEnd(12);
      const formattedAmount = amount.toFixed(2).padStart(8);

      if (type === TransactionType.DEPOSIT) {
        balance += amount;
        result += `${formattedDate}|| ${formattedAmount}  ||           || ${balance.toFixed(2)}\n`;
      } else {
        balance -= amount;
        result += `${formattedDate}||           || ${formattedAmount}  || ${balance.toFixed(2)}\n`;
      }
    }

    return result;
 }

 public showAccountHistoryBetweenTwoDates(date1: Date, date2: Date): string {
  if (date1 > date2) return "Wrong dates";

  const sortedTransactions = this.transactions.sort((a, b) => a.date.getTime() - b.date.getTime());
  const transactionsBetweenTwoDates: Transaction[] = [];

  for (const transaction of sortedTransactions) {
    if (transaction.date >= date1 && transaction.date <= date2) {
      transactionsBetweenTwoDates.push(transaction);
    }
  }

  let balance = 0;
  const transactionsBeforeStartDate = sortedTransactions.filter((transaction) => transaction.date < date1);
  for (const transaction of transactionsBeforeStartDate) {
    if (transaction.type === TransactionType.DEPOSIT) {
      balance += transaction.amount;
    } else {
      balance -= transaction.amount;
    }
  }
  return this.returnAccountHistory(transactionsBetweenTwoDates, balance);

}

private returnAccountHistory(transactions: Transaction[], initialBalance: number): string {
  let result = "date        || credit    || debit     || balance\n";
  let balance = initialBalance;

  for (const transaction of transactions) {
    const { date, amount, type } = transaction;
    const formattedDate = date.toLocaleDateString().padEnd(12);
    const formattedAmount = amount.toFixed(2).padStart(8);

    if (type === TransactionType.DEPOSIT) {
      balance += amount;
      result += `${formattedDate}|| ${formattedAmount}  ||           || ${balance.toFixed(2)}\n`;
    } else {
      balance -= amount;
      result += `${formattedDate}||           || ${formattedAmount}  || ${balance.toFixed(2)}\n`;
    }
  }

  return result;
}

}