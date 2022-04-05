const Bank = require("../src/bank.js");

describe("Bank", () => {
  let bank;
  beforeEach(() => {
    bank = new Bank();
  });
  it("returns the current date", () => {
    // setup
    const expected = "05/04/2022";
    //execute
    const result = bank.date();
    //verify
    expect(result).toEqual(expected);
  });
});
