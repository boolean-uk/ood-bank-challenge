import { type Account } from "@domain/account/account";
import { initializeAccount } from "infrastructure/Accounts/data";

export function useAccount() {
  const account: Account = initializeAccount();

  return {
    account,
    deposit: (date: Date, amount: number) => {
      account.deposit(date, amount);
    },
    getStatement: () => {
      return account.getStatement();
    },
    withdraw: (date: Date, amount: number) => {
      account.withdraw(date, amount);
    },
  };
}
