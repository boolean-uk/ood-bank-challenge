using System.Data;
using System.Data.Common;
using System.Reflection.PortableExecutable;
using System.Text.Json;

public class BankAccount
{

    string id;
    List<Transaction> transactionHistory;

    public BankAccount(string id)
    {
        this.id = id;
        transactionHistory = new List<Transaction>();
    }

    public void AddTransaction(string id, DateTime date, int value, string type)
    {


        if (type != "Credit" && type != "Debit")
        {
            throw new Exception("Malformed transaction");
        }


        transactionHistory.Add(new Transaction(id, date, value, type));

        transactionHistory = transactionHistory.OrderBy(e => e.Date).ToList();
    }

    public string PrintTransactions()
    {

        string jsonString = JsonSerializer.Serialize(transactionHistory);

        return jsonString;
    }

    public void WriteStatement() {
        string formattedUI = "date       || credit  || debit  || balance";
        int balance = 0;

        foreach(Transaction element in transactionHistory) {
            string credit = "       ";
            string debit = "       ";
            
            if(element.Type == "credit") {
                balance += element.Value;
                
            } else {
                balance -= element.Value;
            }

            string date = element.Date.ToString("dd/MM/YYYY");
            
            formattedUI += $"\n{date} ||";

        }

        Console.Write(formattedUI);
    }

    public string ValueToCurrency(int value) {
        string currencyString = value.ToString();

        List<string> splitString = [.. currencyString.Split()];

        splitString.Insert(currencyString.Length-3, ".");

       return String.Join(null,splitString);
        
    }


}

public class Transaction
{
    private string _id;
    public string Id => _id;
    private DateTime _date;
    public DateTime Date => _date;
    private int _value;
    public int Value => _value;
    private string _type;
    public string Type => _type;



    public Transaction(string id, DateTime date, int value, string type)
    {
        _id = id;
        _date = date;
        _value = value;
        _type = type;
    }
}


