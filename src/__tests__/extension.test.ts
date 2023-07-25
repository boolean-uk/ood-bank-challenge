import { SavingsAccount } from "../extension/SavingsAccount";
import { CurrentAccount } from "../extension/CurrentAccount";
import { Customer } from "../extension/Customer";
import { InvestmentAccount } from "../extension/InvestmentAccount";

describe("AccountTest", () => {
  let customer: Customer;
  let current: CurrentAccount;
  let investment: InvestmentAccount;
  let savings: SavingsAccount;

  beforeEach(() => {
    customer = new Customer("John", "Doe", new Date("1990-01-01"));
    current = new CurrentAccount(customer);
    investment = new InvestmentAccount(customer);
    savings = new SavingsAccount(customer);
  });

  it("should open a current account with a balance of 0", () => {
    expect(current.getBalance()).toEqual(0);
  });

  it("should open a current account with a balance of 1000 calculated from transactions", () => {
    current.deposit(1000);
    expect(current.getBalance()).toEqual(1000);
  });

  it("should throw for insufficient balance", () => {
    current.deposit(5000);
    expect(() => current.withdraw(6000)).toThrow("Insufficient funds");
  });

  it("should allow withdrawal with overdraft", () => {
    current.deposit(500);
    current.requestOverdraft(500);
    current.withdraw(800);
    expect(current.getBalance()).toBe(-300); // Account balance: -300 (500 - 800)
  });

  it("investment account cannot have overdraft", () => {
    investment.deposit(500);
    expect(() => investment.requestOverdraft(500)).toThrow(
      "Investment account cannot request overdraft"
    );
  });

  it("savings account cannot have overdraft", () => {
    savings.deposit(500);
    expect(() => savings.requestOverdraft(500)).toThrow(
      "Savings account cannot request overdraft"
    );
  });
});
