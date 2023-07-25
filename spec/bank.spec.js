const Bank = require("../src/bank.js");

describe("Bank Challenge", () => {
  it("Print a statement to show clients desposits and withdrawals, including a date", () => {
    const bank = new Bank();
    bank.deposit(1000, "10-01-2012");
    bank.deposit(2000, "13-01-2012");
    bank.withdraw(500, "14-01-2012");
    const expected =
      "date || credit || debit || balance\n14/01/2012 || || 500.00 || 2500.00\n13/01/2012 || 2000.00 || || 3000.00\n10/01/2012 || 1000.00 || || 1000.00";

    expect(bank.printStatement()).toEqual(expected);
  });
});

describe("deposit()", () => {
  it("Able to deposit money on a particular date", () => {
    const bank = new Bank();
    bank.deposit(1000, "10-01-2012");

    expect(bank.balance).toEqual(1000);
    expect(bank.transactions.length).toEqual(1);
  });

  it("Able to deposit multiple times", () => {
    const bank = new Bank();
    bank.deposit(1000, "10-01-2012");
    bank.deposit(2000, "13-01-2012");

    expect(bank.balance).toEqual(3000);
    expect(bank.transactions.length).toEqual(2);
  });

  it("can create a transaction of type for credit", () => {
    const bank = new Bank();
    bank.deposit(1000, "10-01-2012");

    expect(bank.transactions[0].type).toEqual("credit");
  });
});

describe("withdraw()", () => {
  it("Able to withdraw money on a particular date", () => {
    const bank = new Bank();
    bank.deposit(10000, "10-01-2012");
    bank.withdraw(500, "13-01-2012");

    expect(bank.transactions.length).toEqual(2);
  });

  it("can create a transaction of type for debit", () => {
    const bank = new Bank();
    bank.deposit(1000, "10-01-2012");
    bank.withdraw(500, "13-01-2012");

    expect(bank.transactions[1].type).toEqual("debit");
  });

  it("Able to withdraw multiple times", () => {
    const bank = new Bank();
    bank.deposit(10000, "10-01-2012");
    bank.withdraw(500, "13-01-2012");
    bank.withdraw(100, "14-01-2012");

    expect(bank.balance).toEqual(9400);
    expect(bank.transactions.length).toEqual(3); // Correct?
  });
});
