import { Account } from "./Account"

export class CheckingAccount extends Account {
    private overdraft: number
  
    constructor(accountNumber: string, overdraft: number) {
      super(accountNumber)
      this.overdraft = overdraft
    }
  
    withdraw(amount: number): void {
      const availableFunds = this.balance + this.overdraft
      if (availableFunds - amount < 0) {
        throw new Error("Insufficient funds.")
      }
      this.balance -= amount
    }
  }