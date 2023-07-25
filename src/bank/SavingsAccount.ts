import BankAccount from "./BankAccount";
import Transaction from "./Transaction";

class SavingsAccount extends BankAccount {
  constructor(private _depositLimit: number = 20000) {
    super();
  }

  deposit(amount: number, date: Date) {
    if (amount > 0) {
      let currentYear = new Date().getFullYear;
      let currentYearDepo: number = 0;
      for (let transaction of this._transactions) {
        if (transaction.date.getFullYear === currentYear) {
          currentYearDepo += transaction.amount;
        }
      }
      if (currentYearDepo + amount <= this._depositLimit) {
        const transaction = new Transaction(date, amount, "credit");
        this._transactions.push(transaction);
      }
    }
  }
}

export default SavingsAccount;
