import BankAccount from "@bank/BankAccount";
import SavingsAccount from "@bank/SavingsAccount";

describe("bank account tests", () => {
  let account: BankAccount;

  beforeEach(() => {
    account = new SavingsAccount();
  });

  it("should add deposit", () => {
    account.deposit(500, new Date());
    expect(account.balance).toEqual(500);
  });
  it("shouldnt add deposit cuz limit reached", () => {
    account.deposit(20000, new Date());
    account.deposit(1000, new Date());
    expect(account.balance).toEqual(20000);
  });
});
