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

    abstract withdraw(amount: number): void

    getBalance(): number {
        return this.balance
      }
    
      getAccountNumber(): string {
        return this.accountNumber
      }
    }