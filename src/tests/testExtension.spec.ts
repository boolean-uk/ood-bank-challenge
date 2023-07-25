import { Account, BankStatement } from '../account';

describe('Bank System', () => {
  let bankAccount: Account;
  let bankStatement: BankStatement;

  beforeEach(() => {
    bankAccount = new Account();
    bankStatement = new BankStatement(bankAccount);
  });

  test('should get balance to a certain date', () => {
    bankAccount.deposit(new Date('2012-01-10'), 1000);
    bankAccount.deposit(new Date('2012-01-13'), 2000);
    bankAccount.withdraw(new Date('2012-01-14'), 500);
    bankAccount.withdraw(new Date('2012-01-15'), 500);

    expect(bankAccount.getTransactions()[0].accepted).toBe(true);
    expect(bankAccount.getBalanceTo(new Date('2012-01-14'))).toBe(2500);
    expect(bankAccount.getTransactions().length).toBe(4);
  });


  test('should overdraft if permitted', () => {
    bankAccount.allowOverdraft(500);
    bankAccount.withdraw(new Date('2012-01-14'), 500);

    expect(bankAccount.getMaxOverdraft()).toBe(-500);
    expect(bankAccount.getTransactions()[0].accepted).toBe(true);
    expect(bankAccount.getBalance()).toBe(-500);
  });

  test('should print bank statement between two dates', () => {
    bankAccount.deposit(new Date('2012-01-10'), 1000);
    bankAccount.deposit(new Date('2012-01-13'), 2000);
    bankAccount.withdraw(new Date('2012-01-14'), 500);
    bankAccount.withdraw(new Date('2012-01-15'), 500);

    const expectedOutput = `14/01/2012 ||            ||     500.00 ||    2500.00`;

    const actualStatement = bankStatement.generateStatement(new Date('2012-01-13'), new Date('2012-01-14'));

    expect(actualStatement).toContain(expectedOutput);
  });

});