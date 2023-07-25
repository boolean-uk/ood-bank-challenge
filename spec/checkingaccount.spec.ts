import BankAccount from "@bank/BankAccount";
import CheckingAccount from "@bank/CheckingAccount";

describe("bank account tests", () => {
  let account: BankAccount;

  beforeEach(() => {
    account = new CheckingAccount();
  });

  it("should let overdraft", () => {
    account.deposit(500, new Date());
    account.withdraw(800, new Date());
    expect(account.balance).toEqual(-300);
  });
});
