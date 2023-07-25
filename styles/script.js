function displayBankStatements(statements) {
    const bankStatementsDiv = document.getElementById("bankStatements");
    bankStatementsDiv.innerHTML = "";
  
    for (const statement of statements) {
      const statementDiv = document.createElement("div");
      statementDiv.textContent = statement;
      bankStatementsDiv.appendChild(statementDiv);
    }
  }
  
  const savingsAccount = new SavingsAccount("SAV123");
  const investmentAccount = new InvestmentAccount("INV456");
  const checkingAccount = new CheckingAccount("CHK789", 1000);

const date1 = new Date("2012-01-10")
const date2 = new Date("2012-01-13")
const date3 = new Date("2012-01-14")

const transaction1 = new Transaction("1", date1, 1000.0)
const transaction2 = new Transaction("2", date2, 2000.0)
const transaction3 = new Transaction("3", date3, -500.0)

savingsAccount.deposit(transaction1.getAmount())
savingsAccount.deposit(transaction2.getAmount())
savingsAccount.withdraw(transaction3.getAmount())

investmentAccount.deposit(transaction2.getAmount())
investmentAccount.applyInterest()

checkingAccount.deposit(transaction1.getAmount())
checkingAccount.withdraw(transaction3.getAmount())
checkingAccount.withdraw(1500)


const savingsStatement = new BankStatement("1", savingsAccount.getAccountNumber())
const investmentStatement = new BankStatement("2", investmentAccount.getAccountNumber())
const checkingStatement = new BankStatement("3", checkingAccount.getAccountNumber())

savingsStatement.addTransaction(transaction1)
savingsStatement.addTransaction(transaction3)
  

  document.getElementById("depositForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const depositAmount = parseFloat(document.getElementById("depositAmount").value);
    if (depositAmount > 0) {
      savingsAccount.deposit(depositAmount);

      const savingsStatement = new BankStatement("1", savingsAccount.getAccountNumber());

      const updatedStatements = savingsStatement.generateStatement();
      displayBankStatements(updatedStatements);
    }
  });
  

  document.getElementById("withdrawForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(document.getElementById("withdrawAmount").value);
    if (withdrawAmount > 0) {
      savingsAccount.withdraw(withdrawAmount);

      const savingsStatement = new BankStatement("1", savingsAccount.getAccountNumber());

      const updatedStatements = savingsStatement.generateStatement();
      displayBankStatements(updatedStatements);
    }
  });
  
  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  }
  
  const initialStatements = [];
  displayBankStatements(initialStatements);

document.getElementById("transferForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const fromAccount = document.getElementById("fromAccount").value;
  const toAccount = document.getElementById("toAccount").value;
  const transferAmount = parseFloat(document.getElementById("transferAmount").value);

  if (transferAmount > 0 && fromAccount !== toAccount) {
    if (fromAccount === "savings") {
      savingsAccount.withdraw(transferAmount);
    } else if (fromAccount === "checking") {
      checkingAccount.withdraw(transferAmount);
    } else if (fromAccount === "investment") {
      investmentAccount.withdraw(transferAmount);
    }

    if (toAccount === "savings") {
      savingsAccount.deposit(transferAmount);
    } else if (toAccount === "checking") {
      checkingAccount.deposit(transferAmount);
    } else if (toAccount === "investment") {
      investmentAccount.deposit(transferAmount);
    }

    const updatedSavingsStatement = new BankStatement("1", savingsAccount.getAccountNumber());
    const updatedCheckingStatement = new BankStatement("3", checkingAccount.getAccountNumber());
    const updatedInvestmentStatement = new BankStatement("2", investmentAccount.getAccountNumber());

    const updatedSavingsStatements = updatedSavingsStatement.generateStatement();
    const updatedCheckingStatements = updatedCheckingStatement.generateStatement();
    const updatedInvestmentStatements = updatedInvestmentStatement.generateStatement();

    const savingsStatementsDiv = document.getElementById("savingsStatements");
    const checkingStatementsDiv = document.getElementById("checkingStatements");
    const investmentStatementsDiv = document.getElementById("investmentStatements");

    savingsStatementsDiv.innerHTML = updatedSavingsStatements;
    checkingStatementsDiv.innerHTML = updatedCheckingStatements;
    investmentStatementsDiv.innerHTML = updatedInvestmentStatements;
  }
});