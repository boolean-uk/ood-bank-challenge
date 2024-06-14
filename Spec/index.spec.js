import Bank, { Account, Transaction } from "../src/index.js"

describe("Core Criteria", () => {
  let bank, account, transaction;
  beforeEach(() => {
    bank = new Bank("The Iron Bank of Bravos");
    account = new Account();
  });

  it("should exist", () => {
    expect(bank).toBeInstanceOf(Bank);
    expect(account).toBeInstanceOf(Account);
  });
});
