const BankAccount = require('./src/BankAccount');
const BankStatement = require('./src/BankStatement');

const account = new BankAccount();
account.deposit(1000, "10/01/2012");
account.deposit(2000, "13/01/2012");
account.withdraw(500, "14/01/2012");

const transactions = account.getStatement();
BankStatement.printStatement(transactions);
