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

  describe("#generateBankStatement()", () => {
    it("returns bank statement", () => {
      const date1 = new Date(2012, 0, 10);
      const date2 = new Date(2012, 0, 13);
      const date3 = new Date(2012, 0, 14);
      const amount1 = 1000.0;
      const amount2 = 2000.0;
      const amount3 = 500.0;
      account.deposit(amount1, date1);
      account.deposit(amount2, date2);
      account.withdraw(amount3, date3);
      const expected = `date       || credit  || debit  || balance\n14/01/2012 ||         || 500.00 || 2500.00\n13/01/2012 || 2000.00 ||        || 3000.00\n10/01/2012 || 1000.00 ||        || 1000.00`;

      const result = account.generateBankStatement();
      console.log(result);
      expect(result).toEqual(expected);
    });
  });
});
