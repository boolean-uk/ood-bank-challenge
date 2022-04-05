import Bank from '../src/Bank';

describe('Account', () => {
  const bank = Bank.getInstance();

  beforeEach(() => {
    bank.users = [];
  });

  it('should register an account upon user registration', () => {
    const user = bank.registerUser('John', 'Doe');
    expect(user.accounts.length).toBeGreaterThanOrEqual(1);
  });

  it('should cacluate the balance of an account', () => {
    const user = bank.registerUser('John', 'Doe');
    const account = user.accounts[0];
    expect(account.balance).toBe(0);
  });

  it('accepts deposits', () => {
    const user = bank.registerUser('John', 'Doe');
    const account = user.accounts[0];
    account.deposit(100);
    expect(account.balance).toBe(100);
  });

  it('should cacluate the balance of an account with transaction', () => {
    const user = bank.registerUser('John', 'Doe');
    const account = user.accounts[0];
    const savingsAccount = user.registerAccount('Savings');
    account.deposit(101);
    account.transfer(100, savingsAccount.id);
    expect(savingsAccount.balance).toBe(100);
    expect(account.balance).toBe(1);
  });

  it('accepts withdraws', () => {
    const user = bank.registerUser('John', 'Doe');
    const account = user.accounts[0];
    account.deposit(101);
    account.withdraw(99);
    expect(account.balance).toBe(2);
  });
});
