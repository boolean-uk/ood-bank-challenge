import { Account } from "@domain/account/account";

export function initializeAccount() {
  const account1: Account = new Account();

  // Perform transactions
  account1.deposit(new Date("2012-01-10"), 1000);
  account1.deposit(new Date("2012-01-13"), 2000);
  account1.withdraw(new Date("2012-01-14"), 500);
  account1.withdraw(new Date("2012-01-15"), 500);
  account1.withdraw(new Date("2012-01-16"), 500);

  // Get account statements
  // console.log("Account 1 Statement:");
  // console.log(account1.getStatement());

  return account1;
}
