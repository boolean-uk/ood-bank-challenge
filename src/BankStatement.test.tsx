
import { BankAccount } from './BankStatement';

describe('BankAccount', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = new BankAccount();
  });

  it('should handle deposits and withdrawals correctly', () => {
    bankAccount.deposit('10/01/2012', 1000);
    bankAccount.deposit('13/01/2012', 2000);
    bankAccount.withdraw('14/01/2012', 500);

    const expectedStatement = `date       || credit  || debit  || balance
10/01/2012 || 1000.00 ||         || 1000.00
13/01/2012 || 2000.00 ||         || 3000.00
14/01/2012 ||           || 500.00 || 2500.00`

    expect(bankAccount.printStatement()).toEqual(expectedStatement);
  });
});
