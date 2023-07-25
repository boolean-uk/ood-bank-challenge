import { TRANSACTION_TYPE } from "../enums/TRANSACTION_TYPE";
import { Account } from "./Account";

export class InvestmentAccount extends Account {
  private _interestRate: number = 2;

  override requestOverdraft(amount: number): void {
    throw new Error("Investment account cannot request overdraft");
  }

  accumulateInterest(): void {
    const interestAmount = this.getBalance() * this._interestRate;
    this.createTransaction(interestAmount, TRANSACTION_TYPE.CREDIT, new Date());
  }

  getInterestRate(): number {
    return this._interestRate;
  }
}
