const Card = require("../src/Card.js");
const Bank = require("../src/Bank.js");

describe("", () => {
  let bank;
  beforeEach(() => {
    bank = new Bank();
    bank.createCard("Tibor");
  });

  it("deposit money to card", () => {
    // setUp
    bank.deposit("Tibor", 400);
    // execute
    const result = bank.searchCard("Tibor").balance;

    //verify
    expect(result).toEqual(1400);
  });
  it("deposit multiple times to card", () => {
    // setUp
    bank.deposit("Tibor", 400);
    bank.deposit("Tibor", 2100);
    // execute
    const result = bank.searchCard("Tibor").balance;

    //verify
    expect(result).toEqual(3500);
  });
  it("withdraw multiple times from card", () => {
    // setUp
    bank.deposit("Tibor", 400);
    bank.deposit("Tibor", 2100);
    bank.withdraw("Tibor", 1000);
    bank.withdraw("Tibor", 500);
    // execute
    const result = bank.searchCard("Tibor").balance;

    //verify
    expect(result).toEqual(2000);
  });
  it("withdraw from card", () => {
    // setUp
    bank.deposit("Tibor", 400);
    bank.deposit("Tibor", 2100);
    bank.withdraw("Tibor", 1000);

    // execute
    const result = bank.searchCard("Tibor").balance;

    //verify
    expect(result).toEqual(2500);
  });
  it("creates multiple cards", () => {
    // setUp
    bank.createCard("Bob");

    // execute
    const { ...result1 } = bank.searchCard("Tibor");
    const { ...result2 } = bank.searchCard("Bob");

    let expected1 = {
      transactions: [],
      balance: 1000,
      name: "Tibor",
    };
    let expected2 = {
      transactions: [],
      balance: 1000,
      name: "Bob",
    };

    //verify
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });
  it("throw error if deposit is negative or 0", () => {
    // execute
    expect(() => bank.deposit("Tibor", 0)).toThrowError("Amount not valid");
  });
  it("throw error if withdraw is negative or 0", () => {
    // execute
    expect(() => bank.withdraw("Tibor", 0)).toThrowError("Amount not valid");
  });
  it("shows correct balance", () => {
    //setup
    bank.deposit("Tibor", 400);
    bank.deposit("Tibor", 2100);
    bank.withdraw("Tibor", 1000);
    bank.createCard("Bob");
    bank.deposit("Bob", 2000);
    // execute
    const result = bank.balance;

    //verify
    expect(result).toEqual(5500);
    // execute
  });
});
