import { CurrentAccount } from "../core/CurrentAccount";
import { Customer } from "../core/Customer";

describe("AccountTest", () => {
  let customer: Customer;

  beforeAll(() => {
    customer = new Customer("John", "Doe", new Date("1990-01-01"));
  });
});
