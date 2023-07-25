import { Account } from "./Account";

export class SavingsAccount extends Account {
  withdraw(amount: number): never {
    throw new Error("You can't withdraw from a savings account");
  }
}
