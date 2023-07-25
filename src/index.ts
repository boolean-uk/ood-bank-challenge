import Statement from "./bank/Statement";
import BankAccount from "./bank/BankAccount";
import CheckingAccount from "./bank/CheckingAccount";

const printer = (): void => {
  let account: BankAccount = new CheckingAccount();

  account.deposit(1000, new Date("2023-07-10"));
  account.deposit(2000, new Date("2023-07-13"));
  account.withdraw(500, new Date("2023-07-14"));
  account.generateOrderedStatement(
    new Date("2023-07-13"),
    new Date("2023-07-17")
  );
};

printer();
