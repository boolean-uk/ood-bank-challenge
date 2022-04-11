import Bank from '../src/Bank';

describe('User', () => {
  it('should find user by its id', () => {
    const bank = Bank.getInstance();
    const user = bank.registerUser('John', 'Doe');
    expect(bank.getUser(user.id)).toBe(user);
  });
});
