const Bank = require("../src/bank.js");

describe("", () => {
  //TEST 1
  it("make multiple deposits - with hard coded dates", () => {
    // setup
    const bank = new Bank();
    // execute
    bank.deposit(1000, "01/04/2022");
    bank.deposit(2000, "04/04/2022");
    bank.deposit(3000, "05/04/2022");
    // verify
    expect(bank.transactions.length).toEqual(3);
    expect(bank.accountBalance).toEqual(6000);
  });

  it("make multiple deposits & withdraws - with hard coded dates", () => {
    // setup
    const bank = new Bank();
    // execute
    bank.deposit(1000, "01/04/2022");
    bank.deposit(5000, "04/04/2022");
    bank.withdraw(2000, "05/04/2022");
    // verify
    expect(bank.transactions.length).toEqual(3);
    expect(bank.accountBalance).toEqual(4000);
  });

  it("prints statement", () => {
    // setup
    const bank = new Bank();
    const printedStatement =
      "date  ||  credit  ||  debit  ||  balance\n01/04/2022  ||  1000  ||  credit  ||  1000\n02/04/2022  ||  5000  ||  credit  ||  6000\n03/04/2022  ||  2000  ||  debit  ||  4000\n03/04/2022  ||  250  ||  credit  ||  4250\n05/04/2022  ||  35  ||  debit  ||  4215";
    // execute
    bank.deposit(1000, "01/04/2022");
    bank.deposit(5000, "02/04/2022");
    bank.withdraw(2000, "03/04/2022");
    bank.deposit(250, "03/04/2022");
    bank.withdraw(35, "05/04/2022");
    const result = bank.statement();
    // verify
    expect(bank.transactions.length).toEqual(5);
    expect(bank.accountBalance).toEqual(4215);
    expect(result).toEqual(printedStatement);
  });
});
