import { Account } from "./Account";

export class Customer {
  accounts: Account[];
  constructor(private fullName: string) {
    this.accounts = [];
  }
}
