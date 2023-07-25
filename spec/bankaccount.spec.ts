import Bankaccount from "@bank/Bankaccount";

describe("bank account tests", () => {
  let account: Bankaccount;
  beforeEach(() => {
    account = new Bankaccount();
  });

  it("should deposit correctly", () => {
    account.deposit(500);
    expect(account.balance).toEqual(500);
  });

  it("shouldnt deposit", () => {
    account.deposit(-500);
    expect(account.balance).toEqual(0);
  });

  it("should withdraw correctly", () => {
    account.deposit(1000);
    account.withdraw(500);
    expect(account.balance).toEqual(500);
  });
});
