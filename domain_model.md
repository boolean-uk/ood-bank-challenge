PROPERTIES:

-Array of transactions [transactions]
-Account balance - number

-Transaction is an Objects {
    -amount - number -- i could add £ sign before the amount
    -date - new Date(), -- in my example i will hard code date, in case i want to implement search by date
    -balance - number -- this is the balance after the current transaction
    -type - string -- debit or credit.
}

CLASS - Bank

METHODS: 

deposit(amount, date)
    -create transaction
    -add transaction to the transactions array
    -update account balance
    -throw ERROR if - the amount entered is not valid (below zero), not a number.

withdraw(amount, date)
    -create transaction
    -add transaction to the transactions array
    -update account balance
    -throw ERROR if - the amount entered is not valid, not a number, or the balance goes below a limit

statement()
    -return all transactions in order of the dates they were created
    -stating the date, amount, type, balance after transaction
    -could also display the total final account balance - after all the transactions

date()
    -creates todays date, formats as dd/mm/yyyy.
