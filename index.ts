import { Customer } from "./src/core/Customer";
import { CurrentAccount } from "./src/core/CurrentAccount";
import { TRANSACTION_TYPE } from "./src/core/enums/TRANSACTION_TYPE";

// printing bank statement
let customer: Customer = new Customer("John", "Doe", new Date("1990-01-01"));
const current = new CurrentAccount(customer);

current.createTransaction(1000, TRANSACTION_TYPE.CREDIT);
current.createTransaction(2000, TRANSACTION_TYPE.CREDIT);
current.createTransaction(500, TRANSACTION_TYPE.DEBIT);

current.printBankStatement();
