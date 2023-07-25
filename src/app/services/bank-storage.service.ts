import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BankStorageService {
  constructor() {
  }

  private _balance: number = 0;

  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    this._balance = value;
  }

  deposit(amount: number) {
    this.balance += amount
  }

  withdraw(amount: number) {

    if (this.balance >= amount) {
      this.balance -= amount
    }
  }
}
