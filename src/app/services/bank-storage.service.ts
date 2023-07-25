import {Injectable} from '@angular/core';
import {Operation, Transaction} from "../interfaces/transaction";
import {BehaviorSubject, map, Observable} from "rxjs";

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

  getCalculateBalance(): number {
    let balance: number = 0


    this.history.subscribe((transactions: Transaction[]) => {
      for (const transaction of transactions) {
        if (transaction.type === Operation.deposit) {
          balance += transaction.balance
        }
        if (transaction.type === Operation.withdraw) {
          balance -= transaction.balance
        }
      }
    })
    return balance
  }

  getSortedHistory(): Observable<Transaction[]> {
    return this._history.pipe(map((transactions: Transaction[]) => {
      return transactions.slice().sort((a: Transaction, b: Transaction) => b.date.getTime() - a.date.getTime());
    }));
  }

  deposit(amount: number): void {
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

  withdraw(amount: number): void {
    if (amount > this.balance) {
      throw new Error("Not enough money!")
    }

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
