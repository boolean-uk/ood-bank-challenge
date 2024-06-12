BankAccount testAccount = new BankAccount("BigSpender");

        testAccount.AddTransaction("1", new DateTime(2024, 1, 1, 10, 30, 0), 100, "Credit");
        testAccount.AddTransaction("2", new DateTime(2024, 1, 2, 14, 45, 0), 200, "Debit");
        testAccount.AddTransaction("3", new DateTime(2024, 1, 3, 9, 15, 0), 150, "Credit");
        testAccount.AddTransaction("4", new DateTime(2024, 1, 4, 16, 0, 0), 300, "Debit");
        testAccount.AddTransaction("5", new DateTime(2024, 1, 5, 12, 0, 0), 250, "Credit");

Console.Write(testAccount.PrintTransactions());