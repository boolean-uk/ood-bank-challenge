# Domain model for Bank Challenge

```ts
enum TransactionType {
    Deposit,
    Withdraw,
    Intrests
}

interface TransactionI {
    getDate(): Date
    getAmount(): number
    getType(): TransactionType
}

class Transaction implements TransactionI {
    private date: Date
    private amount: number
    private type: TransactionTyp

    public getDate(): Date {}
    public getAmount(): number {}
    public getType(): TransactionType {}
}

interface BankAccountI {
    deposit(amount: number): boolean
    withdraw(amount: number): boolean
    getTransactions(): TransactionI[]
    calculateCurrentBallance(): number
}

class AbstractBankAccount implements BankAccountI {
    private transactions: TransactionI[]

    public deposit(amount: number): boolean {}
    public withdraw(amount: number): boolean {}
    public getTransactions(): TransactionI[] {}
    private calculateCurrentBallance(): number {}
}

class SavingsBanckAccount extends AbstractBankAccount {
    private depositLimitPerYear: number

    public override deposit(amount: number): boolean {}
}

class InvestmentBanckAccount extends AbstractBankAccount {
    public accumulateInterest(percent: number): boolean {}
}

class CheckingBanckAccount extends AbstractBankAccount {
    private overdraftLimit: number

    public override withdraw(amount: number): boolean {}
}

interface BankStatementGeneratorI {
    public generateBankStatement(transactions: TransactionI[]): string
    public generateBankStatementBetweenTwoDates(transactions: TransactionI[], earlierDate: Date, laterDate: Date): string
}

class BankStatementGenerator implements BankStatementGeneratorI {
    public generateBankStatement(transactions: TransactionI[]): string {}
    public generateBankStatementBetweenTwoDates(transactions: TransactionI[], earlierDate: Date, laterDate: Date): string {}
}
```
