import {Injectable} from '@angular/core';
import {Operation, Transaction} from "../interfaces/transaction";

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

  private _history: Transaction[] = []

  get history(): Transaction[] {
    return this._history;
  }

  set history(value: Transaction[]) {
    this._history = value;
  }

  deposit(amount: number) {
    this.history.push({
      type: Operation.deposit,
      balance: amount,
      balanceBefore: this.balance,
      balanceAfter: this.balance + amount,
      date: new Date()
    })

    this.balance += amount

  }

  withdraw(amount: number) {

    if (this.balance >= amount) {
      this.balance -= amount
    }

  }
}
