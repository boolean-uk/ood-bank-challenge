import { CheckingAccount } from "./CheckingAccount"
import { SavingsAccount } from "./SavingsAccount"
import { StatementGenerator } from "./StatementGenerator"


let bankAccount = new CheckingAccount()
bankAccount.deposit(100000.40)
bankAccount.withdraw(100.12)
bankAccount.withdraw(100)
bankAccount.withdraw(31.41)
bankAccount.withdraw(59.26)
bankAccount.withdraw(5.35)
bankAccount.deposit(589.79)
bankAccount.deposit(323.84)


StatementGenerator.generateStatement(bankAccount)