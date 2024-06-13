const BankAccount = require('../models/BankAccount');
const SavingsAccount = require('../models/SavingsAccount');
const CheckingAccount = require('../models/CheckingAccount');
const InvestmentAccount = require('../models/InvestmentAccount');
const BankStatement = require('../models/BankStatement');

describe('BankAccount', () => {
    let account;

    beforeEach(() => {
        account = new BankAccount();
    });

    test('should deposit amount correctly', () => {
        account.deposit(1000, "10/01/2012");
        expect(account.getBalance()).toBe(1000);
    });

    test('should withdraw amount correctly', () => {
        account.deposit(1000, "10/01/2012");
        account.withdraw(500, "14/01/2012");
        expect(account.getBalance()).toBe(500);
    });

    test('should not allow withdrawal if insufficient funds', () => {
        account.deposit(500, "10/01/2012");
        expect(() => {
            account.withdraw(1000, "14/01/2012");
        }).toThrow("Insufficient funds");
    });

    test('should generate statement correctly', () => {
        account.deposit(1000, "10/01/2012");
        account.deposit(2000, "13/01/2012");
        account.withdraw(500, "14/01/2012");

        const statement = account.getStatement();
        expect(statement.length).toBe(3);
        expect(statement[0].amount).toBe(1000);
        expect(statement[1].amount).toBe(2000);
        expect(statement[2].amount).toBe(500);
    });

    test('should generate ordered statement between dates', () => {
        account.deposit(1000, "10/01/2012");
        account.deposit(2000, "13/01/2012");
        account.withdraw(2000, "14/01/2012");

        const statement = account.getStatementBetweenDates("11/01/2012", "15/01/2012");
        expect(statement.length).toBe(2);
        expect(statement[0].amount).toBe(2000);
        expect(statement[1].amount).toBe(2000);
    });

    test('should reject deposits exceeding annual limit for savings account', () => {
        const savingsAccount = new SavingsAccount();
        savingsAccount.deposit(15000, "01/01/2022");
        expect(() => {
            savingsAccount.deposit(10000, "01/02/2022");
        }).toThrow("Deposit limit exceeded for the year");
    });

    test('should allow setting overdraft limit for checking account', () => {
        const checkingAccount = new CheckingAccount();
        checkingAccount.setOverdraftLimit(500);
        checkingAccount.deposit(1000, "01/01/2022");
        expect(() => {
            checkingAccount.withdraw(1200, "01/02/2022");
        }).not.toThrow();
        expect(checkingAccount.getBalance()).toBe(-200);
    });

    test('should add monthly interest to investment account', () => {
        const investmentAccount = new InvestmentAccount();
        investmentAccount.deposit(1000, "01/01/2022");
        investmentAccount.addMonthlyInterest();
        expect(investmentAccount.getBalance()).toBeCloseTo(1020, 2);
    });

    test('should generate a correct PDF statement', async () => {
        const account = new BankAccount();
        account.deposit(1000, "10/01/2012");
        account.deposit(2000, "13/01/2012");
        account.withdraw(500, "14/01/2012");

        const statement = account.getStatement();
        await BankStatement.generatePDF(statement);

        const fs = require('fs');
        expect(fs.existsSync('BankStatement.pdf')).toBe(true);

        fs.unlinkSync('BankStatement.pdf');
    });
});
