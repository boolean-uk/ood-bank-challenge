export class Transaction {
    private transactionId: string
    private date: Date
    private amount: number
  
    constructor(transactionId: string, date: Date, amount: number) {
      this.transactionId = transactionId
      this.date = date
      this.amount = amount
    }
  
    getAmount(): number {
      return this.amount
    }
  
    getDate(): Date {
      return this.date
    }
  }