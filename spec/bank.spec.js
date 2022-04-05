const BankAccount = require("../src/bankAccount.js");
const Transaction = require("../src/tx.js");
const Printer = require("../src/printer.js");

describe("BankAccount", () => {
  let bankAccount;

  beforeEach(() => {
    bankAccount = new BankAccount();
  });

  it("checks the balance of the new account instance", () => {
    // setup
    const expected = 0;
    // execute
    const result = bankAccount.checkBalance();
    // verify
    expect(result).toEqual(expected);
  });
});
