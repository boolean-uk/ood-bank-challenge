import {Injectable} from '@angular/core';
import {Operation, Transaction} from "../interfaces/transaction";
import {BehaviorSubject, Observable} from "rxjs";

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

  private _history: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([])

  get history(): Observable<Transaction[]> {
    return this._history.asObservable();
  }

  deposit(amount: number) {
    const transaction: Transaction = {
      type: Operation.deposit,
      balance: amount,
      balanceBefore: this.balance,
      balanceAfter: this.balance + amount,
      date: new Date()
    };

    this._history.next([...(this._history.getValue() || []), transaction]);

    this.balance += amount;
  }

  withdraw(amount: number) {
    if (this.balance >= amount) {
      const transaction: Transaction = {
        type: Operation.withdraw,
        balance: amount,
        balanceBefore: this.balance,
        balanceAfter: this.balance - amount,
        date: new Date()
      };

      this._history.next([...(this._history.getValue() || []), transaction]);

      this.balance -= amount;
    }
  }
}
