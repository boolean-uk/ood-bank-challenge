import BankAccount from "./BankAccount";

class SavingsAccount extends BankAccount {
  constructor(private _depositLimit: number = 20000) {
    super();
  }
}

export default SavingsAccount;
