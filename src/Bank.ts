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
}
const bankAccount = new Bank();
const depositAmount = 1000;
const date = new Date('2023-07-24');
const result = bankAccount.deposit(depositAmount, date);
const accountHistory = bankAccount.showAccountHistory();
console.log(accountHistory);