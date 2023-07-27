import { Bank } from './App.ts';

describe('Bank', () => {
  let bank: Bank;

  beforeEach(() => {
    bank = new Bank();
  });

  test('should handle deposits and withdrawals correctly', () => {
    bank.deposit(1000, '2012-01-10');
    bank.deposit(2000, '2012-01-13');
    bank.withdraw(500, '2012-01-14');

    expect(bank.transactions.length).toBe(3);
  });

  test('should correctly calculate the balance after transactions', () => {
    bank.deposit(1000, '2012-01-10');
    bank.deposit(2000, '2012-01-13');
    bank.withdraw(500, '2012-01-14');

    expect(bank.transactions.length).toBe(3);

    //    the expected balance should be 2500 (1000 + 2000 - 500)
    expect(bank.transactions[0].balance).toBe(1000);
    expect(bank.transactions[1].balance).toBe(3000);
    expect(bank.transactions[2].balance).toBe(2500);
  });

  test('should correctly print the bank statement', () => {
    const logSpy = jest.spyOn(console, 'log');

    bank.deposit(1000, '2012-01-10');
    bank.deposit(2000, '2012-01-13');
    bank.withdraw(500, '2012-01-14');

    bank.printStatement();

    expect(logSpy).toHaveBeenCalledWith('date       || credit  || debit  || balance');
    expect(logSpy).toHaveBeenCalledWith('14/01/2012 ||         || 500.00 || 2500.00');
    expect(logSpy).toHaveBeenCalledWith('13/01/2012 || 2000.00 ||        || 3000.00');
    expect(logSpy).toHaveBeenCalledWith('10/01/2012 || 1000.00 ||        || 1000.00');

    logSpy.mockRestore();
  });
});