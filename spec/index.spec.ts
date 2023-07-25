import { Account } from "../src";

describe("Account test", () => {
  let account: Account;

  beforeEach(() => {
    account = new Account();
  });

  describe("#deposit(amount: number, date: object)", () => {
    it("returns message when user want to deposit valid amount, save transaction with positive amount", () => {
      const date = new Date();
      const amount = 100;
      const result = account.deposit(amount, date);

      expect(result).toEqual("The money has been added to your account.");
      expect(account.balance).toEqual(amount);
    });

    it("returns message want to deposit invalid amount (e.g. negative)", () => {
      const date = new Date();
      const amount = -1;
      const result = account.deposit(amount, date);

      expect("Given amount is invalid.").toEqual(result);
      expect(account.balance).toEqual(0);
    });
  });
});
