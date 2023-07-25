import BankAccount from "./BankAccount";
import Transaction from "./Transaction";

class CheckingAccount extends BankAccount {
  constructor(private _overdraftLimit: number = 500) {
    super();
  }
  withdraw(amount: number, date: Date) {
    if (amount <= this.balance + this._overdraftLimit) {
      const transaction = new Transaction(date, -amount, "debit");
      this._transactions.push(transaction);
    }
  }
}

export default CheckingAccount;
