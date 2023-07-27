import { type Account } from "@domain/account/account";
import { initializeAccount } from "infrastructure/Accounts/data";
import { getMaxAge } from "next/dist/server/image-optimizer";

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
    getBalance: () => {
      return account.getBalance();
    },
    getMinimumDate: () => {
      return account.getMinimumDate();
    },
    getMaximumDate: () => {
      return account.getMaximumDate();
    },
    getStatementsBetweenDates: (startDate: Date, endDate: Date) => {
      return account.getStatementsBetweenDates(startDate, endDate);
    },
  };
}
