import { Account, CheckingAccount } from "../src/Accounts.js";

describe("Accounts", () => {
  let testAccount;

  beforeEach(() => {
    testAccount = new Account("Will Baxter", "12345678");
  });

  it("should accepts credits into a list of transactions", () => {
    testAccount.credit(10);

    expect(testAccount.getTransactions().length).toEqual(1);
    expect(Number(testAccount.getTransactions()[0].amount)).toEqual(10);
    expect(testAccount.getTransactions()[0].constructor.name).toEqual("Credit");
  });

  it("should accepts debits into a list of transactions", () => {
    testAccount.credit(10);
    testAccount.debit(10);

    expect(testAccount.getTransactions().length).toEqual(2);
  });

  it("should have a method to return all credits to account", () => {
    testAccount.credit(10);
    testAccount.debit(5);
    testAccount.credit(3);

    expect(testAccount.credits.length).toEqual(2);
  });

  it("should have a method to return all debits to account", () => {
    testAccount.credit(10);
    testAccount.debit(5);
    testAccount.debit(3);

    expect(testAccount.debits.length).toEqual(2);
  });

  it("should have a method to return current balance", () => {
    testAccount.credit(23.32);
    testAccount.debit(12.01);

    expect(testAccount.balance).toEqual(11.31);
  });

  it("should have a method to return transactions between certain dates", () => {
    testAccount.credit(23.32);
    testAccount.debit(12.01);

    expect(testAccount.balance).toEqual(11.31);
  });

  it("should return transactions for a set period", () => {
    testAccount.credit(10, 3);
    testAccount.debit(5, 5);
    testAccount.credit(3, 7);
    testAccount.credit(23.32, 9);
    testAccount.debit(12.01, 11);
    testAccount.credit(10, 13);
    testAccount.debit(5, 15);
    testAccount.credit(3, 17);

    expect(
      testAccount.getStatement("", "2023-9-4", "2023-9-10").transactions.length
    ).toEqual(3);
  });

  it("should prevent debits that take balance below zero", () => {
    testAccount.credit(10);
    expect(() => testAccount.debit(12)).toThrowError("Insufficient funds");
  });
});

describe("Checking Accounts", () => {
  let testCheckingAccount;

  beforeEach(() => {
    testCheckingAccount = new CheckingAccount("Will Baxter", 12345678, 10);
  });
  it("should allow debits up to the overdraft", () => {
    testCheckingAccount.credit(5);
    testCheckingAccount.debit(15);
  
    expect(testCheckingAccount.balance).toEqual(-10)
  });

});


