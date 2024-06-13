using BankAccountNS;

BankAccount testAccount = new BankAccount("BigSpender");

testAccount.AddTransaction("1", new DateTime(2024, 1, 1, 10, 30, 0), 10000, "Credit");
testAccount.AddTransaction("2", new DateTime(2024, 1, 2, 9, 15, 0), 15000, "Credit");
testAccount.AddTransaction("3", new DateTime(2024, 1, 3, 12, 0, 0), 25000, "Credit");
testAccount.AddTransaction("4", new DateTime(2024, 1, 4, 14, 45, 0), 20000, "Debit");
testAccount.AddTransaction("5", new DateTime(2024, 1, 5, 16, 0, 0), 30000, "Debit");

testAccount.PrintStatementToPDF();

//The project fails when this isntance of the class is completely removed
//I do not currently understand why, this will be removed when the cause is determined