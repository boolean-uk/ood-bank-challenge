import { NormalAccount, Transaction } from "../src/bank";
describe("Normal account tests", () => {
  let normalAccount: NormalAccount;

  beforeEach(() => {
    normalAccount = new NormalAccount();
  });

  it("should create normal account with balance at 0 and empty transactions list", () => {
    expect(normalAccount.balance).toEqual(0);
    expect(normalAccount.transactions.length).toEqual(0);
  });
  it("should deposit amount to balance", () => {
    normalAccount.deposit(100);
    expect(normalAccount.balance).toEqual(100);
  });
  it("should not deposit amount to balance - wrong data provided", () => {
    normalAccount.deposit(-100);
    expect(normalAccount.balance).toEqual(0);
  });

  it("should withdraw from account", () => {
    normalAccount.deposit(200);
    normalAccount.withdraw(100);
    expect(normalAccount.balance).toEqual(100);
  });

  it("should not withdraw from account - user wants to withdraw too much", () => {
    normalAccount.deposit(200);
    normalAccount.withdraw(1000);
    expect(normalAccount.balance).toEqual(200);
  });

  it("should withdraw from account and deposit", () => {
    normalAccount.deposit(200);
    normalAccount.withdraw(400);
    expect(normalAccount.balance).toEqual(-200);
  });

  it("should not withdraw from account and deposit - wrong data provided", () => {
    normalAccount.deposit(200);
    normalAccount.withdraw(-100);
    expect(normalAccount.balance).toEqual(200);
  });

  it("should add transaction to Transaction list after proper deposit", () => {
    normalAccount.deposit(200);
    expect(normalAccount.transactions.length).toEqual(1);
  });
  it("should add transaction to Transaction list after proper withdraw", () => {
    normalAccount.deposit(200);
    normalAccount.deposit(100);
    expect(normalAccount.transactions.length).toEqual(2);
  });
  it("should add plenty transaction to Transaction list after proper withdraw", () => {
    normalAccount.deposit(200);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    expect(normalAccount.transactions.length).toEqual(6);
  });

  it("should return Transaction has been done properly message", () => {
    expect(normalAccount.deposit(200)).toEqual(
      "Transaction has been done properly"
    );
  });
  it("should return Transaction has been declined message", () => {
    expect(normalAccount.deposit(-11211)).toEqual(
      "Transaction has been declined!"
    );
  });
  it("should return Transaction has been done properly message", () => {
    normalAccount.deposit(400);
    expect(normalAccount.withdraw(200)).toEqual(
      "Transaction has been done properly"
    );
  });
  it("should return Transaction has been declined message", () => {
    expect(normalAccount.withdraw(-112)).toEqual(
      "Transaction has been declined!"
    );
  });
  it("should return Transaction has been declined message", () => {
    expect(normalAccount.withdraw(600)).toEqual(
      "Transaction has been declined!"
    );
  });

  it("should add plenty transaction to Transaction list after proper withdraw and create statement", () => {
    var yesterdaydate = new Date();
    yesterdaydate.setDate(yesterdaydate.getDate() - 1);

    var tomorrowdate = new Date();
    tomorrowdate.setDate(tomorrowdate.getDate() + 1);

    normalAccount.deposit(200);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.deposit(100);
    normalAccount.createStatement(yesterdaydate, tomorrowdate);
    expect(normalAccount.transactions.length).toEqual(6);
  });

  it("Should create proper statement", () => {
    var yesterdaydate = new Date();
    yesterdaydate.setDate(yesterdaydate.getDate() - 1);

    var tomorrowdate = new Date();
    tomorrowdate.setDate(tomorrowdate.getDate() + 1);

    let normalAccount = new NormalAccount();
    normalAccount.deposit(100);
    normalAccount.deposit(222500);
    normalAccount.withdraw(100);
    normalAccount.withdraw(222400);
    normalAccount.withdraw(300);
    let statement: string = normalAccount.createStatement(
      yesterdaydate,
      tomorrowdate
    );
    expect(statement).toContain("date");
    expect(statement).toContain("credit");
    expect(statement).toContain("debit");
    expect(statement).toContain("balance");
    expect(statement).toContain("222500.00");
  });
});

describe("Transaction tests", () => {
  let transaction: Transaction;
  beforeEach(() => {
    transaction = new Transaction(100, true, 100);
  });

  it("should create transaction with actual date", () => {
    transaction = new Transaction(100, true, 100);
    expect(transaction.date).toEqual(Date.now());
  });

  it("should create transaction with amount = 100", () => {
    expect(transaction.amount).toEqual(100);
  });

  it("should create transaction with transaction type true", () => {
    expect(transaction.transactionType).toEqual(true);
  });

  it("should create transaction with transaction type false", () => {
    transaction = new Transaction(100, false, 100);
    expect(transaction.transactionType).toEqual(false);
  });

  it("should create transaction with balance = 100", () => {
    expect(transaction.balance).toEqual(100);
  });
});
