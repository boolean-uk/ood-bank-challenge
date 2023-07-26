import { BankAccount } from '../src/bankAccount';

describe('BankAccount', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = new BankAccount();
  });

  it('should record a deposit transaction and update balance correctly', () => {
    bankAccount.deposit(1000, new Date('2012-01-10'));
    expect(bankAccount.calculateBalance()).toBe(1000);
  });