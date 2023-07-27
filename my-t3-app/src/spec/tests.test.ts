import { Account } from "@domain/account/account";

import { Transaction, TransactionType } from "@domain/account/transaction";
import { error } from "console";

describe("Account", () => {
  let account: Account;

  beforeEach(() => {
    account = new Account();
  });

  it("should have initial balance of 0", () => {
    expect(account.getBalance()).toBe(0);
  });

  it("should have an empty transaction history", () => {
    expect(account.getTransactionHistory()).toEqual([]);
  });

  it("should deposit correctly and update balance", () => {
    account.deposit(new Date("2023-07-25"), 100);
    expect(account.getBalance()).toBe(100);
  });

  it("should withdraw correctly and update balance", () => {
    account.deposit(new Date("2023-07-25"), 200);
    account.withdraw(new Date("2023-07-26"), 50);
    expect(account.getBalance()).toBe(150);
  });

  it("should deposit multiple times and update balance accordingly", () => {
    account.deposit(new Date("2023-07-25"), 100);
    account.deposit(new Date("2023-07-26"), 200);
    account.deposit(new Date("2023-07-27"), 50);
    expect(account.getBalance()).toBe(350);
  });

  it("should have correct transaction history after deposits and withdrawals", () => {
    account.deposit(new Date("2023-07-25"), 100);
    account.withdraw(new Date("2023-07-26"), 50);
    account.deposit(new Date("2023-07-27"), 200);
    account.withdraw(new Date("2023-07-28"), 70);

    const transactionHistory = account.getTransactionHistory();
    expect(transactionHistory).toHaveLength(4);

    // Validate the order of transactions in the history
    expect(transactionHistory[0].getType()).toBe("deposit");
    expect(transactionHistory[1].getType()).toBe("withdrawal");
    expect(transactionHistory[2].getType()).toBe("deposit");
    expect(transactionHistory[3].getType()).toBe("withdrawal");
  });

  it("should withdraw multiple times and update balance accordingly", () => {
    account.deposit(new Date("2023-07-25"), 200);
    account.withdraw(new Date("2023-07-26"), 50);
    account.withdraw(new Date("2023-07-27"), 30);
    expect(account.getBalance()).toBe(120);
  });

  it("should throw error when withdrawing more than balance", () => {
    account.deposit(new Date("2023-07-25"), 100);
    expect(() => {
      account.withdraw(new Date("2023-07-26"), 150);
    }).toThrowError("Insufficient funds for withdrawal.");
  });

  it("should throw error when withdrawing negative amount", () => {
    account.deposit(new Date("2023-07-25"), 100);
    expect(() => {
      account.withdraw(new Date("2023-07-26"), -50);
    }).toThrowError(
      "Invalid withdrawal amount. Amount must be a positive number."
    );
  });

  it("should throw an error when getting the minimum date from an empty transaction history", () => {
    expect(() => {
      account.getMinimumDate();
    }).toThrowError("No transactions found.");
  });

  it("should throw an error when getting the maximum date from an empty transaction history", () => {
    expect(() => {
      account.getMaximumDate();
    }).toThrowError("No transactions found.");
  });
  it("should generate an empty statement when there are no transactions", () => {
    const statement = account.getStatement();
    const expectedStatement = "date       || credit  || debit  || balance\n";
    expect(statement).toBe(expectedStatement);
  });

  it("should generate a statement for transactions within a date range", () => {
    account.deposit(new Date("2023-07-25"), 100);
    account.withdraw(new Date("2023-07-26"), 50);
    account.deposit(new Date("2023-07-27"), 200);
    account.withdraw(new Date("2023-07-28"), 70);

    const startDate = new Date("2023-07-26");
    const endDate = new Date("2023-07-27");

    const statement = account.getStatementsBetweenDates(startDate, endDate);

    expect(statement).toContain("150.00");
  });
});

describe("Transaction", () => {
  it("should create a deposit transaction correctly", () => {
    const date = new Date("2023-07-25");
    const amount = 100;
    const type = TransactionType.DEPOSIT;

    const transaction = new Transaction(date, amount, type);

    expect(transaction.getDate()).toBe(date);
    expect(transaction.getAmount()).toBe(amount);
    expect(transaction.getType()).toBe("deposit");
    expect(transaction.toString()).toBe(
      `Transaction: 2023-07-25T00:00:00.000Z, 100, deposit`
    );
  });

  it("should create a withdrawal transaction correctly", () => {
    const date = new Date("2023-07-26");
    const amount = 50;
    const type = TransactionType.WITHDRAWAL;

    const transaction = new Transaction(date, amount, type);

    expect(transaction.getDate()).toBe(date);
    expect(transaction.getAmount()).toBe(amount);
    expect(transaction.getType()).toBe("withdrawal");
    expect(transaction.toString()).toBe(
      `Transaction: 2023-07-26T00:00:00.000Z, 50, withdrawal`
    );
  });
});
