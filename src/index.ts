import {Account, BankStatement} from "./account"

const bankAccount = new Account();
bankAccount.deposit(new Date('2012-01-10'), 1000);
bankAccount.deposit(new Date('2012-01-10'), 1000);
bankAccount.withdraw(new Date('2012-01-14'), 500);
const bankStatement = new BankStatement(bankAccount);
console.log("Current Balance: "+ bankAccount.getBalance())
console.log(bankStatement.printStatement())

bankAccount.deposit(new Date('2012-01-13'), 2000);
bankAccount.withdraw(new Date('2012-01-14'), 500);
bankAccount.withdraw(new Date('2012-01-15'), 500);


console.log("Balance to 14.01.2012: "+ bankAccount.getBalanceTo( new Date('2012-01-14')))
console.log("Bank statement between certain dates: ")

const actualStatement = bankStatement.generateStatement(new Date('2012-01-13'), new Date('2012-01-14'));

console.log(actualStatement)


const bankAccount1 = new Account();
bankAccount1.allowOverdraft(500);
bankAccount1.withdraw(new Date('2012-01-14'),20);
console.log("New bank account with possible overdraft")
const bankStatement1 = new BankStatement(bankAccount1);
console.log(bankStatement1.printStatement())

