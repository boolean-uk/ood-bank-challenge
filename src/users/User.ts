import Account from '../accounts/Account';
import Transaction from '../transactions/Transaction.model';
import UUID from '../utils/UUID';
import IUser from './User.model';

export default class User implements IUser {
  id: string;

  firstName: string;

  lastName: string;

  accounts: Account[];

  constructor(id: string, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.accounts = [];

    this.registerAccount('Main');
  }

  getAccount(id: string): Account | undefined {
    return this.accounts.find((account) => account.id === id);
  }

  getAccounts(): Account[] {
    return this.accounts;
  }

  registerAccount(name: string, transactions?: Transaction[]): Account {
    const acc = new Account(UUID.forAccount(), name, this.id, transactions);
    this.accounts.push(acc);
    return acc;
  }
}
