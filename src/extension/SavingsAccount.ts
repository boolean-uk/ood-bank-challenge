import { Account } from "./Account";

export class SavingsAccount extends Account {
  override requestOverdraft(amount: number): void {
    throw new Error("Savings account cannot request overdraft");
  }

  withdraw(amount: number): never {
    throw new Error("You can't withdraw from a savings account");
  }
}
