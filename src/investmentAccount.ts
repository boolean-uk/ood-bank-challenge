import { Account } from "./Account"

export class InvestmentAccount extends Account {
    private interestRate: number
  
    constructor(accountNumber: string) {
      super(accountNumber)
      this.interestRate = 0.02
    }
  
    withdraw(amount: number): void {
      if (this.balance - amount < 0) {
        throw new Error("Insufficient funds.")
      }
      this.balance -= amount
    }
  
    applyInterest(): void {
      this.balance += this.balance * this.interestRate
    }
  }