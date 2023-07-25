import bankaccount from "@bank/Bankaccount";
import Bankaccount from "@bank/Bankaccount";
import Statement from "@bank/Statement";

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

  it("should print a bank statement correctly", () => {
    account.deposit(1000, new Date("2023-07-10"));
    account.deposit(2000, new Date("2023-07-13"));
    account.withdraw(500, new Date("2023-07-14"));
    const mockLog = jest.spyOn(console, "log");
    account.generateStatement();
    expect(mockLog).toHaveBeenCalledTimes(4);
    expect(mockLog.mock.calls[0][0]).toMatch(/date.*credit.*debit.*balance/);
    expect(mockLog.mock.calls[1][0]).toMatch(
      /10\/07\/2023\s+\|\|\s+1000.00\s+\|\|\s+\|\|\s+1000.00/
    );
    expect(mockLog.mock.calls[2][0]).toMatch(
      /13\/07\/2023\s+\|\|\s+2000.00\s+\|\|\s+\|\|\s+3000.00/
    );
    expect(mockLog.mock.calls[3][0]).toMatch(
      /14\/07\/2023\s+\|\|\s+\|\|\s+500.00\s+\|\|\s+2500.00/
    );
  });
});
