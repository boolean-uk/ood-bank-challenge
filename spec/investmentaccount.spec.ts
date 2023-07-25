import BankAccount from "@bank/BankAccount";
import InvestmentAccount from "@bank/InvestmentAccount";

describe("bank account tests", () => {
  let account: BankAccount;

  beforeEach(() => {
    account = new InvestmentAccount();
  });

  it("should add interest", () => {
    account.deposit(500, new Date());
    account.addInterest();
    expect(account.balance).toEqual(510);
  });

  it("shouldnt let overdraft", () => {
    account.deposit(500, new Date());
    account.withdraw(1000, new Date());
    expect(account.balance).toEqual(500);
  });
});
