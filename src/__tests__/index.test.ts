import { Account } from "../core/Account";
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

  it("should be able to withdraw 100 from the current account", () => {
    const current = new CurrentAccount(customer);
    current.deposit(1000);
    current.withdraw(100);

    expect(current.getBalance()).toEqual(900);
  });

  it("should throw for insufficient balance", () => {
    const current = new CurrentAccount(customer);
    expect(() => current.withdraw(1)).toThrow("Insufficient funds");
  });
});
