import { Account } from "./Account";

export class Customer {
  accounts: Account[];
  constructor(private fullName: string) {
    this.accounts = [];
  }

  createAccount() {
    const account: Account = new Account("12345");
    this.accounts.push(account);
  }

  getAccountsLength() {
    return this.accounts.length;
  }
}
