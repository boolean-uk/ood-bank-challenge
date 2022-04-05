&& Bank Challenge

-=+=-

Requirements
------------
-> You should be able to interact with your code via a JavaScript REPL - Node REPL or browser console.
-> Deposits, withdrawal.
-> Account statement (date, credit, debit, balance), and printing.
-> Data can be kept in memory.

-=+=-

Classes, Constructors, and Methods
----------------------------------
class bankAccount {
    constructors:
                 this.account = []
                 this.balance = 0
    methods:
            -> createAccount(name) - creates an object with the passed name and empty array to hold the tx
            -> checkBalance() - tracks the overall balance of the account
            -> depositFunds(#, date) - credit the selected account with the amount referenced
}
