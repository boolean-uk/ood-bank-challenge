using System.Data;
using System.Text.Json;
using UglyToad.PdfPig.Content;
using UglyToad.PdfPig.Writer;
using UglyToad.PdfPig.Fonts.Standard14Fonts;
using UglyToad.PdfPig.Core;


namespace BankAccountNS;
public class BankAccount
{

    string id;
    List<Transaction> transactionHistory;

    public BankAccount(string id)
    {
        this.id = id;
        transactionHistory = new List<Transaction>();
    }

    public void AddTransaction(string id, DateTime date, int value, string type, int overdraft = 0)
    {


        if (type != "Credit" && type != "Debit")
        {
            throw new Exception("Malformed transaction");
        }

        if (type == "Debit" && value > CalculateBalance() + overdraft)
        {
            throw new Exception("Insufficent funds");
        }


        transactionHistory.Add(new Transaction(id, date, value, type));

        transactionHistory = transactionHistory.OrderBy(e => e.Date).ToList();
    }

    public string WriteTransactionsJson()
    {

        string jsonString = JsonSerializer.Serialize(transactionHistory);

        return jsonString;
    }

    private int CalculateBalance()
    {
        int balance = 0;

        foreach (Transaction element in transactionHistory)
        {


            if (element.Type == "Credit")
            {
                balance += element.Value;


            }
            else
            {
                balance -= element.Value;
            }
        }

        return balance;
    }

    public string OutputBalance()
    {
        return ValueToCurrency(CalculateBalance());
    }

    public string PrintStatement()
    {
        return FormatTransactions(transactionHistory);

    }

    public void PrintStatementToPDF()
    {

        string statement = PrintStatement();
        PdfDocumentBuilder builder = new PdfDocumentBuilder();

        PdfPageBuilder page = builder.AddPage(PageSize.A5);
        PdfDocumentBuilder.AddedFont font = builder.AddStandard14Font(Standard14Font.Courier);


        string[] statementByLine = PrintStatement().Split('\r');
        int xCoOrd = 25;
        int yCoOrd = 520;
        foreach (string element in statementByLine)
        {


            page.AddText(element, 12, new PdfPoint(xCoOrd, yCoOrd), font);

            
            yCoOrd -= 25;

        }



        byte[] documentBytes = builder.Build();

        File.WriteAllBytes(@"C:\PDF\Statment.pdf", documentBytes);
    }

    private string FormatTransactions(List<Transaction> selectedTransactions)
    {
        string formattedUI = "date       || credit  || debit   || balance";
        int balance = 0;

        foreach (Transaction element in selectedTransactions)
        {
            string credit = "       ";
            string debit = "       ";


            if (element.Type == "Credit")
            {
                balance += element.Value;
                credit = ValueToCurrency(element.Value);

            }
            else
            {
                balance -= element.Value;
                debit = ValueToCurrency(element.Value);
            }

            string date = element.Date.ToString("dd/MM/yyyy");

            var runningBalance = ValueToCurrency(balance);

            formattedUI += $"\r{date} || {credit} || {debit} || {runningBalance}";

        }

        return formattedUI;
    }

    public string PrintSelectedDates(DateTime startDate, DateTime endDate)
    {
        List<Transaction> selectedTransactions = new List<Transaction>();

        foreach (Transaction element in transactionHistory)
        {
            if (element.Date > startDate && element.Date < endDate)
            {
                selectedTransactions.Add(element);
            }
        }

        return FormatTransactions(selectedTransactions);
    }

    private string ValueToCurrency(int value)
    {
        string currencyString = value.ToString();
        List<char> splitString = [.. currencyString.ToCharArray()];

        if (currencyString.Length > 2)
        {
            splitString.Insert(splitString.Count - 2, '.');
        }
        else
        {

            while (splitString.Count < 2)
            {
                splitString.Insert(0, '0');
            }

            splitString.Insert(0, '.');
            splitString.Insert(0, '0');
        }

        var finalValue = String.Join(null, splitString);

        return $"£{finalValue}";

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


