import Bankaccount from "@bank/Bankaccount";

describe("bank account tests", () => {
  let account: Bankaccount;

  beforeEach(() => {
    account = new Bankaccount();
  });

  it("should deposit correctly", () => {
    account.deposit(500, new Date());
    expect(account.balance).toEqual(500);
  });

  it("shouldnt deposit", () => {
    account.deposit(-500, new Date());
    expect(account.balance).toEqual(0);
  });

  it("transaction history test", () => {
    account.deposit(500, new Date());
    account.deposit(500, new Date());
    account.deposit(500, new Date());
    account.deposit(500, new Date());
    account.withdraw(500, new Date());
    expect(account.balance).toEqual(1500);
  });
  it("should withdraw correctly", () => {
    account.deposit(1000, new Date());
    account.withdraw(500, new Date());
    expect(account.balance).toEqual(500);
  });
});
