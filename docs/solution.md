# About the solution

## Domain model

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
    

## Extensions chosen

*  Disable withdrawals if the withdraw amount exceeds the available funds. Available funds must be calculated based on a complete transaction history, not a variable that gets updated
*  Allow adding a 500 overdraft to the account
*  Different account types (SavingsAccount, CurrentAccount, InvestmentAccount). Savings accounts cant have overdrafts, current accounts can. Investment accounts accumulate 2% interest every month.
*  Deposit limits of 20,000 per year on Savings accounts