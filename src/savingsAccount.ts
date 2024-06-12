import { Account } from "./Account"

export class SavingsAccount extends Account {
    constructor(accountNumber: string) {
      super(accountNumber)
    }
  
    withdraw(amount: number): void {
      if (this.balance - amount < 0) {
        throw new Error("Insufficient funds.");
      }
      this.balance -= amount
    }
  } 