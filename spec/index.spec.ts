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
      expect(account.transactions.length).toEqual(1);
      expect(account.transactions[0].amount).toEqual(amount);
      expect(account.transactions[0].date).toEqual(date);
    });

    it("returns message want to deposit invalid amount (e.g. negative)", () => {
      const date = new Date();
      const amount = -1;
      const result = account.deposit(amount, date);

      expect("Given amount is invalid.").toEqual(result);
      expect(account.balance).toEqual(0);
      expect(account.transactions.length).toEqual(0);
    });
  });

  describe("#withdraw(amount: number, date: object)", () => {
    it("returns message when user want to withdraw more money than he/she got", () => {
      const date = new Date();
      const amountToDeposit = 100;
      const amountToWithdraw = 200;
      account.deposit(amountToDeposit, date);
      const result = account.withdraw(amountToWithdraw, date);

      expect(result).toEqual("You don't have enough money.");
      expect(account.balance).toEqual(amountToDeposit);
      expect(account.transactions.length).toEqual(1);
    });

    it("returns message when user want to withdraw valid amount (less than the user has in the account),save transaction with negative amount", () => {
      const date = new Date();
      const amountToDeposit = 100;
      const amountToWithdraw = 50;
      account.deposit(amountToDeposit, date);
      const result = account.withdraw(amountToWithdraw, date);

      expect(result).toEqual("The money has been withdrawn from your account.");
      expect(account.balance).toEqual(amountToDeposit - amountToWithdraw);
      expect(account.transactions.length).toEqual(2);
      expect(account.transactions[1].amount).toEqual(-1 * amountToWithdraw);
      expect(account.transactions[1].date).toEqual(date);
    });

    it("returns message when user want to withdraw valid amount(equal to the amount that the user has in the account),save transaction with negative amount", () => {
      const date = new Date();
      const amountToDeposit = 100;
      const amountToWithdraw = 100;
      account.deposit(amountToDeposit, date);
      const result = account.withdraw(amountToWithdraw, date);

      expect(result).toEqual("The money has been withdrawn from your account.");
      expect(account.balance).toEqual(amountToDeposit - amountToWithdraw);
      expect(account.transactions.length).toEqual(2);
      expect(account.transactions[1].amount).toEqual(-100);
      expect(account.transactions[1].date).toEqual(date);
    });

    it("returns message when user want to withdraw invalid amount (e.g. negative)", () => {
      const date = new Date();
      const amountToDeposit = 100;
      const amountToWithdraw = -100;
      account.deposit(amountToDeposit, date);
      const result = account.withdraw(amountToWithdraw, date);

      expect("Given amount is invalid.").toEqual(result);
      expect(account.balance).toEqual(100);
      expect(account.transactions.length).toEqual(1);
    });
  });
});
