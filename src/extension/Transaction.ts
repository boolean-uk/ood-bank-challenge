import { Account } from "./Account";
import { TRANSACTION_TYPE } from "./enums/TRANSACTION_TYPE";

export class Transaction {
  private readonly type: TRANSACTION_TYPE;
  private readonly amount: number;
  private readonly account: Account;
  private readonly date: Date;

  constructor(
    type: TRANSACTION_TYPE,
    amount: number,
    account: Account,
    date: Date
  ) {
    this.type = type;
    this.amount = amount;
    this.account = account;
    this.date = date;
  }

  getType(): TRANSACTION_TYPE {
    return this.type;
  }

  getAmount(): number {
    return this.amount;
  }

  getDate(): Date {
    return this.date;
  }
}
