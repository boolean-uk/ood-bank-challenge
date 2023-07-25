import BankAccount from "./BankAccount";
import Transaction from "./Transaction";

class InvestmentAccount extends BankAccount {
  addInterest() {
    const interest = this.balance * 0.02;
    const transaction = new Transaction(new Date(), interest, "credit");
    this._transactions.push(transaction);
  }
}

export default InvestmentAccount;
