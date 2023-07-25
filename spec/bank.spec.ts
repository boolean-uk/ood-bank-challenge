import { Decimal } from "decimal.js";
import { Account } from "../src/bank";

describe("Bank account", () => {
  let account: Account;

  beforeEach(() => {
    account = new Account();
  });

  it("should enable deposits and withdrawals", () => {
    account.deposit(new Decimal(1000));
    account.deposit(new Decimal(2000));
    account.withdraw(new Decimal(500));

    expect(account.balance).toEqual(new Decimal(2500));
  });
});
