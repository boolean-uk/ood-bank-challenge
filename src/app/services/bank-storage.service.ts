import {Injectable} from '@angular/core';
import {Operation, Transaction} from "../interfaces/transaction";
import {BehaviorSubject, map, Observable} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class BankStorageService {
  constructor(private localStorage: LocalStorageService) {
  }

  // private _balance: number = 0;
  //
  // get balance(): number {
  //   return this._balance;
  // }
  //
  // set balance(value: number) {
  //   this._balance = value;
  // }

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
    const calculatedBalance: number = this.getCalculateBalance()
    const transaction: Transaction = {
      type: Operation.deposit,
      balance: amount,
      balanceBefore: calculatedBalance,
      balanceAfter: calculatedBalance + amount,
      date: new Date()
    };

    this._history.next([...(this._history.getValue() || []), transaction]);

    // this.balance = calculatedBalance + amount;
    this.persistTransaction()
  }

  persistTransaction() {
    this.history.subscribe((transactions: Transaction[]) => {
      this.localStorage.persistData(transactions)
    })
  }

  loadData() {
    const loaded: Transaction[] = this.localStorage.loadData()

    for (const transaction of loaded) {
      this._history.next([...(this._history.getValue() || []), <Transaction>{
        type: transaction.type,
        balance: transaction.balance,
        balanceBefore: transaction.balanceBefore,
        balanceAfter: transaction.balanceAfter,
        date: new Date(transaction.date)
      }]);
    }
  }

  withdraw(amount: number): void {
    const balance = this.getCalculateBalance()
    if (amount > balance) {
      throw new Error("Not enough money!")
    }

    if (balance >= amount) {
      const calculatedBalance: number = this.getCalculateBalance()
      const transaction: Transaction = {
        type: Operation.withdraw,
        balance: amount,
        balanceBefore: calculatedBalance,
        balanceAfter: calculatedBalance - amount,
        date: new Date()
      };

      this._history.next([...(this._history.getValue() || []), transaction]);

      // this.balance -= calculatedBalance - amount;
      this.persistTransaction()
    }
  }
}
