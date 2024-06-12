export abstract class Account {
    protected accountNumber: string
    protected balance: number
  
    constructor(accountNumber: string) {
      this.accountNumber = accountNumber
      this.balance = 0.0
    }
  
    deposit(amount: number) {
      this.balance += amount
    }

    // Disable withdraws if the withdraw amount exceeds the available funds
    withdraw(amount: number): void {
      if (this.balance - amount < 0) {
        throw new Error("Insufficient funds.")
      }
      this.balance -= amount
    }

    getBalance(): number {
        return this.balance
      }
    
      getAccountNumber(): string {
        return this.accountNumber
      }
    }