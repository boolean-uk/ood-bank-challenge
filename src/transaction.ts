export class Transaction{
    private date: Date;
    private amount: number;
    accepted: boolean;
    private isDeposit: boolean;

  constructor(date: Date, amount: number, accepted: boolean, isDeposit: boolean) {
    this.date = date;
    this.amount = amount;
    this.accepted = accepted;
    this.isDeposit = isDeposit;
  }

  getDate(): Date {
    return this.date;
  }

  getAmount(): number {
    return this.amount;
  }

  isDepositTransaction(): boolean {
    return this.isDeposit;
  }
}