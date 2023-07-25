# About the solution

## Domain model
```javascript
abstract Account 
    transactions: List<Transaction>
    
    deposit(amount: number): void 
    // if amount is a positive number add new transaction to transaction list
    // otherwise throw exception

    withdraw(amount: number): void
    // if amount is a positive number and balance is sufficient add new transaction to transaction list
    // otherwise throw exception

    generateStatement(): string
    // generate bank statement with transaction dates, amounts, and balance at the time of transaction

    getBalance(): number
    // returns balance based on transactions

CurrentAccount: Account
    overdraftAllowed: boolean
    overdraftRequested: boolean

    @override withdraw(amount: number): void
    requestOverdraft(): void
    approveOverdraftRequest(): void
    rejectOverdraftReqest(): void

SavingsAccount: Account

InvestmentAccount: Account
    @override getBalance(): number

Transaction
    date: LocalTimeDate
    amount: number
```

## Extensions chosen

*  Disable withdrawals if the withdraw amount exceeds the available funds. Available funds must be calculated based on a complete transaction history, not a variable that gets updated
*  Allow adding a 500 overdraft to the account
*  Different account types (SavingsAccount, CurrentAccount, InvestmentAccount). Savings and Investment accounts cant have overdrafts, current accounts can. Investment accounts accumulate 2% interest every month.
*  Deposit limits of 20,000 per year on Savings accounts

## Work status


#### Standard
- [v ] Meets the spec
- [v ] Developed test-first (commit your tests before your source code to provide evidence of this)
- [v ] Passes tests
- [v ] Encapsulates adding and storing Transactions in a class
- [v ] Encapsulates Statement formatting in a class
- [v ] Encapsulates Transaction data in a class

#### Extensions
- [ ] Generate ordered bank statements between 2 dates
- [v ] Disable withdraws if the withdraw amount exceeds the available funds. Available funds must be calculated based on a complete transaction history, not a variable that gets updated
- [v ] Allow adding a 500 overdraft to the account
- [v ] Different account types (Savings, Investment, Checking). Savings & Investment accounts cant have overdrafts, Checking accounts can. Investment accounts accumulate 2% interest every month.
- [v ] Deposit limits of 20,000 per year on Savings accounts
- [ ] A front-end online banking app
- [ ] Generate PDFs of bank statements
