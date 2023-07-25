import {Injectable} from '@angular/core';
import {Transaction} from "../interfaces/transaction";
import {StorageKeys} from "../consts/storage-keys";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  persistData(data: Transaction[]) {
    localStorage.setItem(StorageKeys.TRANSACTIONS, JSON.stringify(data))
  }

  loadData(): Transaction[] {
    const data = localStorage.getItem(StorageKeys.TRANSACTIONS)
    if (!data) {
      return [];
    }

    return JSON.parse(data)
  }
}
