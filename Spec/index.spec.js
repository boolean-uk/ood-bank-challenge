import Bank, { Account, Transaction } from "../src/index.js";

describe("Core Requirements", () => {
  let bank, account, transaction;
  beforeEach(() => {
    bank = new Bank("The Iron Bank of Bravos");
    account = bank.createAccount();
  });

  it("should exist", () => {
    expect(bank).toBeInstanceOf(Bank);
    expect(account).toBeInstanceOf(Account);
  });

  it("should make deposits", () => {
    expect(account.balance).toBe(0);
    bank.deposit(account, 1000);
    expect(account.balance).toBe(1000);
  });

  it("should make withdrawals", () => {
    expect(account.balance).toBe(0);
    bank.deposit(account, 1000);
    expect(account.balance).toBe(1000);
    bank.withdraw(account, 200);
    expect(account.balance).toBe(800);
  });
});
