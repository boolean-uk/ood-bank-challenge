from datetime import datetime
from typing import List

class Transaction:
    def __init__(self, amount: int, date: datetime):
        self.amount = amount
        self.date = date

    def __str__(self):
        return f"{self.date.strftime('%d/%m/%Y')} || {self.amount:7d} ||         || {self.balance:7d}"

class BankAccount:
    def __init__(self):
        self.transactions: List[Transaction] = []

    def deposit(self, amount: int, date: datetime):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self.transactions.append(Transaction(amount, date))

    def withdraw(self, amount: int, date: datetime):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        self.transactions.append(Transaction(-amount, date))

    def calculate_balance(self) -> int:
        return sum(transaction.amount for transaction in self.transactions)

    def print_statement(self):
        print("date       || credit  || debit  || balance")
        balance = 0
        for transaction in reversed(self.transactions):
            balance += transaction.amount
            transaction.balance = balance
            print(transaction)

    def to_json(self):
        return {
            "transactions": [
                {
                    "date": transaction.date.strftime("%d/%m/%Y"),
                    "amount": transaction.amount,
                }
                for transaction in self.transactions
            ],
            "balance": self.calculate_balance(),
        }

# Tests
def test_deposit():
    account = BankAccount()
    account.deposit(1000, datetime(2012, 1, 10))
    assert account.calculate_balance() == 1000

def test_withdraw():
    account = BankAccount()
    account.deposit(1000, datetime(2012, 1, 10))
    account.withdraw(500, datetime(2012, 1, 14))
    assert account.calculate_balance() == 500

def test_bank_statement(capsys):
    account = BankAccount()
    account.deposit(1000, datetime(2012, 1, 10))
    account.deposit(2000, datetime(2012, 1, 13))
    account.withdraw(500, datetime(2012, 1, 14))
    account.print_statement()
    captured = capsys.readouterr()
    assert captured.out == (
        "date       || credit  || debit  || balance\n"
        "14/01/2012 ||         ||    500 ||    2500\n"
        "13/01/2012 ||    2000 ||         ||    3000\n"
        "10/01/2012 ||    1000 ||         ||    1000\n"
    )

def test_to_json():
    account = BankAccount()
    account.deposit(1000, datetime(2012, 1, 10))
    account.deposit(2000, datetime(2012, 1, 13))
    account.withdraw(500, datetime(2012, 1, 14))
    assert account.to_json() == {
        "transactions": [
            {"date": "10/01/2012", "amount": 1000},
            {"date": "13/01/2012", "amount": 2000},
            {"date": "14/01/2012", "amount": -500},
        ],
        "balance": 2500,
    }

if __name__ == "__main__":
    test_deposit()
    test_withdraw()
    test_bank_statement()
    test_to_json()