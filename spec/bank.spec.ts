import { subMonths, subYears } from "date-fns";
import { Decimal } from "decimal.js";
import fs from "fs";
import { Account, CheckingAccount, InvestmentAccount, SavingsAccount } from "../src/account.js";
import { clearAccounts, openAccount } from "../src/bank.js";

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
    const statementLines = account.getStatement().printout.split("\n");

    // Test
    expect(statementLines[0].replace(/\s/g, "")).toMatch(/date\|\|credit\|\|debit\|\|balance/);
    expect(statementLines[1].replace(/\s/g, "")).toMatch(/14\/01\/2012\|\|\|\|500.00\|\|2500.00/);
    expect(statementLines[2].replace(/\s/g, "")).toMatch(/13\/01\/2012\|\|2000.00\|\|\|\|3000.00/);
    expect(statementLines[3].replace(/\s/g, "")).toMatch(/10\/01\/2012\|\|1000.00\|\|\|\|1000.00/);
  });

  it("should generate bank statement in pdf", async () => {
    // Setup
    account.deposit(new Decimal(1000), new Date("2012-01-10"));
    account.deposit(new Decimal(2000), new Date("2012-01-13"));
    account.withdraw(new Decimal(500), new Date("2012-01-14"));
    const pdfPath = await account.getStatement().downloadPdf();

    // Test
    fs.access(pdfPath, fs.constants.F_OK, (err) => {
      if (err) throw new Error(`File ${pdfPath} does not exist`);
    });
  });

  it("should generate ordered bank statement between 2 dates", () => {
    // Setup
    account.deposit(new Decimal(1000), new Date("2012-01-10"));
    account.deposit(new Decimal(2000), new Date("2012-01-13"));
    account.withdraw(new Decimal(500), new Date("2012-01-14"));
    account.withdraw(new Decimal(500), new Date("2012-02-01"));
    const startDate = new Date("2012-01-13");
    const endDate = new Date("2012-01-14");
    const statementLines = account.getStatement(startDate, endDate).printout.trim().split("\n");

    // Test
    expect(statementLines.length).toEqual(3);
    expect(statementLines[0].replace(/\s/g, "")).toMatch(/date\|\|credit\|\|debit\|\|balance/);
    expect(statementLines[1].replace(/\s/g, "")).toMatch(/14\/01\/2012\|\|\|\|500.00\|\|2500.00/);
    expect(statementLines[2].replace(/\s/g, "")).toMatch(/13\/01\/2012\|\|2000.00\|\|\|\|3000.00/);
  });

  it("should disable withdraws if the withdraw amount exceeds the available funds", () => {
    // Setup
    account.deposit(new Decimal(1000));
    account.deposit(new Decimal(2000));

    // Test
    expect(() => account.withdraw(new Decimal(4000))).toThrow("Insufficient funds!");
  });

  it("should allow adding a 500 overdraft to the account", () => {
    // Setup
    account.deposit(new Decimal(1000));
    account.deposit(new Decimal(2000));

    // Test
    expect(() => account.withdraw(new Decimal(3200))).toThrow("Insufficient funds!");
    account.allowOverdraft();
    expect(() => account.withdraw(new Decimal(3200))).not.toThrow("Insufficient funds!");
    expect(() => account.withdraw(new Decimal(400))).toThrow("Insufficient funds!");
  });

  it("should create savings/investment/checking accounts (only checking with overdrafts)", () => {
    // Setup
    const savingsAccount = openAccount(SavingsAccount);
    const investmentAccount = openAccount(InvestmentAccount);
    const checkingAccount = openAccount(CheckingAccount);

    // Test
    expect(() => savingsAccount.withdraw(new Decimal(500))).toThrow("Insufficient funds!");
    expect(() => investmentAccount.withdraw(new Decimal(500))).toThrow("Insufficient funds!");
    expect(() => checkingAccount.withdraw(new Decimal(500))).not.toThrow("Insufficient funds!");
  });

  it("should accumulate interest of 2 % per month on investment account", () => {
    // Setup
    const now = new Date();
    const monthAgo = subMonths(now, 1);
    const twoMonthsAgo = subMonths(now, 2);
    account = openAccount(InvestmentAccount);
    account.deposit(new Decimal(100), twoMonthsAgo);
    account.deposit(new Decimal(100), monthAgo);
    const accumulatedInterest = (account as InvestmentAccount).calculateInterest(now);

    // Test
    expect(accumulatedInterest).toEqual(new Decimal(6));
  });

  it("should throw expection when SavingsAccount deposit limit exceeds 20,000 per year", () => {
    // Setup
    const now = new Date();
    const sixMonthsAgo = subMonths(now, 6);
    const twoYearsAgo = subYears(now, 2);
    account = openAccount(SavingsAccount);
    account.deposit(new Decimal(11000), twoYearsAgo);

    // Test
    expect(() => account.deposit(new Decimal(11000), sixMonthsAgo)).not.toThrow(
      "Deposit limit exceeded"
    );
    expect(() => account.deposit(new Decimal(10000), now)).toThrow("Deposit limit exceeded");
  });
});
