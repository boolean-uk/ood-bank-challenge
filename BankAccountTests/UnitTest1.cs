using BankAccountNS;

namespace BankTests;

[TestClass]
public class BankAccountTests
{
    [TestMethod]
    public void Succesfully_Add_Transaction()
    {
        BankAccount testAccount = new BankAccount("BigSpender");
        string jsonExample = """[{"Id":"1","Date":"2024-01-01T10:30:00","Value":10000,"Type":"Credit"}]""";

        testAccount.AddTransaction("1", new DateTime(2024, 1, 1, 10, 30, 0), 10000, "Credit");

        Assert.AreEqual(jsonExample, testAccount.PrintTransactions());
    }

    [TestMethod]
    public void Print_Formatted_Statement()
    {
        BankAccount testAccount = new BankAccount("BigSpender");
        string formattedText = "date       || credit  || debit  || balance";
        formattedText += "\n01/01/2024 || £100.00 ||         || £100.00";
        formattedText += "\n02/01/2024 ||         || £200.00 || £-100.00";
        formattedText += "\n03/01/2024 || £150.00 ||         || £50.00";
        formattedText += "\n04/01/2024 ||         || £300.00 || £-250.00";
        formattedText += "\n05/01/2024 || £250.00 ||         || £0.00";


        testAccount.AddTransaction("1", new DateTime(2024, 1, 1, 10, 30, 0), 10000, "Credit");
        testAccount.AddTransaction("2", new DateTime(2024, 1, 2, 14, 45, 0), 20000, "Debit");
        testAccount.AddTransaction("3", new DateTime(2024, 1, 3, 9, 15, 0), 15000, "Credit");
        testAccount.AddTransaction("4", new DateTime(2024, 1, 4, 16, 0, 0), 30000, "Debit");
        testAccount.AddTransaction("5", new DateTime(2024, 1, 5, 12, 0, 0), 25000, "Credit");


        Assert.AreEqual(formattedText, testAccount.WriteStatement());
    }
}