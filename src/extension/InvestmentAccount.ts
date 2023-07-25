import { Account } from "./Account";

export class InvestmentAccount extends Account {
  private _interestRate: number = 2;

  override requestOverdraft(amount: number): void {
    throw new Error("Investment account cannot request overdraft");
  }

  getInterestRate(): number {
    return this._interestRate;
  }
}
