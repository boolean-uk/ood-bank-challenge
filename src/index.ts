import Statement from "./bank/Statement";
import Bankaccount from "./bank/Bankaccount";

const printer = (): void => {
  let account: Bankaccount = new Bankaccount();
  account.deposit(1000, new Date("2023-07-10"));
  account.deposit(2000, new Date("2023-07-13"));
  account.withdraw(500, new Date("2023-07-14"));
  let statement: Statement = new Statement(account);
  statement.print();
};

printer();
