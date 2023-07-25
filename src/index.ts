import Decimal from "decimal.js";
import { clearAccounts, getAccount, openAccount } from "./bank";

clearAccounts();

for (let i = 0; i < 7; i++) {
  const account = openAccount();
}

const account = getAccount("000004");

account.deposit(new Decimal(1000), new Date("2012-01-10"));
account.deposit(new Decimal(2000), new Date("2012-01-13"));
account.withdraw(new Decimal(500), new Date("2012-01-14"));

const statement = account.statement;
console.log(statement);
