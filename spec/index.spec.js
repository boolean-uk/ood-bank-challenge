const { default: Decimal } = require("decimal.js");

describe("AccountTest", () => {
  let customer;

  beforeAll(() => {
    customer = new Customer("John", "Doe", new Date("1990-01-01"));
  });

  it("should open a current account with a balance of 0", () => {
    const current = new CurrentAccount(customer);
    expect(current.getBalance()).toEqual(new Decimal("0"));
  });
});
