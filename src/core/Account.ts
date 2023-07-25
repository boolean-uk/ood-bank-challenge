import { Customer } from "./Customer";

export class Account {
  private _balance: number;
  private _customer: Customer;

  constructor(customer: Customer) {
    this._balance = 0;
    this._customer = customer;
  }

  getBalance() {
    return this._balance;
  }

  withdraw(amount: number) {
    if (this._balance >= amount) {
      this._balance -= amount;
    } else {
      throw new Error("Insufficient funds");
    }
  }

  deposit(amount: number) {
    this._balance += amount;
  }
}
