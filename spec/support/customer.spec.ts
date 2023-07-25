import { Customer } from "../../src/Customer";

describe("Customer tests", () => {
  let customer: Customer;
  beforeEach(() => {
    customer = new Customer("Marlena Luczak");
  });

  describe("Checking length of accounts array for customer without any account", () => {
    it("accounts length should be 0", () => {
      expect(customer.accounts.length).toEqual(0);
    });
  });

  describe("Creating one account", () => {
    it("accounts length should be 1", () => {
      customer.createAccount();
      expect(customer.accounts.length).toEqual(1);
    });
  });

  describe("Creating two accounts", () => {
    it("accounts length should be 2", () => {
      customer.createAccount();
      customer.createAccount();
      expect(customer.accounts.length).toEqual(2);
    });
  });
});
