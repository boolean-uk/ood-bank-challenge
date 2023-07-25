import { Account, BankStatement } from './account';

describe('Bank System', () => {
  let bankAccount: Account;
  let bankStatement: BankStatement;

  beforeEach(() => {
    bankAccount = new Account();
    bankStatement = new BankStatement(bankAccount);
  });

  test('should deposit correctly', () => {
    bankAccount.deposit(new Date('2012-01-10'), 1000);
    bankAccount.deposit(new Date('2012-01-13'), 2000);

    expect(bankAccount.getTransactions()[0].accepted).toBe(true);
    expect(bankAccount.getTransactions().length).toBe(2);
  });

  test('should withdraw correctly', () => {
    bankAccount.deposit(new Date('2012-01-10'), 1000);
    bankAccount.deposit(new Date('2012-01-13'), 2000);
    bankAccount.withdraw(new Date('2012-01-14'), 500);

    expect(bankAccount.getTransactions()[2].accepted).toBe(true);
    expect(bankAccount.getTransactions().length).toBe(3);
  });

  test('0 balance', () => {
    expect(bankAccount.getTransactions().length).toBe(0);
    expect(bankAccount.getBalance()).toBe(0);

  });

  test('should withdraw correctly', () => {
    bankAccount.withdraw(new Date('2012-01-14'), 500);

    expect(bankAccount.getTransactions()[0].accepted).toBe(false);
    expect(bankAccount.getTransactions().length).toBe(1);
  });

  test('should deposit and withdraw correctly and print the bank statement', () => {
    bankAccount.deposit(new Date('2012-01-10'), 1000);
    bankAccount.deposit(new Date('2012-01-13'), 2000);
    bankAccount.withdraw(new Date('2012-01-14'), 500);

    const expectedOutput = `date       || credit  || debit  || balance
=======================================
10/01/2012 || 1000.00 ||        || 1000.00
13/01/2012 || 2000.00 ||        || 3000.00
14/01/2012 ||         || 500.00 || 2500.00`;

    const actualStatement = bankStatement.printStatement();

    expect(actualStatement).toEqual(expectedOutput);
  });

  test('should calculate the correct balance after deposits and withdrawals', () => {
    bankAccount.deposit(new Date('2012-01-10'), 1000);
    bankAccount.deposit(new Date('2012-01-13'), 2000);
    bankAccount.withdraw(new Date('2012-01-14'), 500);

    expect(bankAccount.getBalance()).toBe(2500);
  });
});
