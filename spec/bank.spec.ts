import { Decimal } from "decimal.js";
import { Account } from "../src/account";
import { clearAccounts, openAccount } from "../src/bank";

describe("Bank account", () => {
  let account: Account;

  beforeEach(() => {
    clearAccounts();
    account = openAccount();
  });

  it("should enable deposits and withdrawals", () => {
    // Setup
    account.deposit(new Decimal(1000));
    account.deposit(new Decimal(2000));
    account.withdraw(new Decimal(500));

    // Test
    expect(account.balance).toEqual(new Decimal(2500));
  });

  it("should print bank statement", () => {
    // Setup
    account.deposit(new Decimal(1000), new Date("2012-01-10"));
    account.deposit(new Decimal(2000), new Date("2012-01-13"));
    account.withdraw(new Decimal(500), new Date("2012-01-14"));

    // Test
    const statementLines = account.statement.split("\n");
    expect(statementLines[0].replace(/\s/g, "")).toMatch(/date\|\|credit\|\|debit\|\|balance/);
    expect(statementLines[1].replace(/\s/g, "")).toMatch(/14\/01\/2012\|\|\|\|500.00\|\|2500.00/);
    expect(statementLines[2].replace(/\s/g, "")).toMatch(/13\/01\/2012\|\|2000.00\|\|\|\|3000.00/);
    expect(statementLines[3].replace(/\s/g, "")).toMatch(/10\/01\/2012\|\|1000.00\|\|\|\|1000.00/);
  });
});
