import jasmine from "jasmine";
import { Account } from "../../src/Account";

describe("Account tests", () => {
  let account: Account;
  beforeEach(() => {
    account = new Account();
  });

  describe("Checking balance after creating new account", () => {
    it("account balance should be 0", () => {
      expect(account.getBalance()).toEqual(0);
    });
  });

  describe("Trying to withdraw money when balance is equal 0", () => {
    it("should throw error", () => {
      expect(account.witdrawFunds(200)).toThrow(new Error("You don't have enough money to make this withdrawal"));
    });
  });

  describe("Checking balance after depositng 500$", () => {
    it("account balance should be equal to 500", () => {
      account.depositFunds(500);
      expect(account.getBalance()).toEqual(500);
    });
  });

  describe("Checking balance after depositng 500$ and withdrawing 200$ ", () => {
    it("account balance should be equal to 200", () => {
      account.depositFunds(500);
      account.withdrawFunds(200);
      expect(account.getBalance()).toEqual(300);
    });
  });

  describe("Checking number of transaction after depositng 500$ and withdrawing 200$ ", () => {
    it("transactions length should be equal to 2", () => {
      expect(account.getTransactions().length).toEqual(2);
    });
  });
});
