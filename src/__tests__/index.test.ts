import { CurrentAccount } from "../core/CurrentAccount";
import { Customer } from "../core/Customer";

describe("AccountTest", () => {
  let customer: Customer;

  beforeAll(() => {
    customer = new Customer("John", "Doe", new Date("1990-01-01"));
  });

  it("should open a current account with a balance of 0", () => {
    const current = new CurrentAccount(customer);
    expect(current.getBalance()).toEqual(0);
  });

  it("should open a current account with a balance of 1000", () => {
    const current = new CurrentAccount(customer);
    current.deposit(1000);
    expect(current.getBalance()).toEqual(1000);
  });
});
