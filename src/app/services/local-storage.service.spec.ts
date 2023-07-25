import {TestBed} from '@angular/core/testing';

import {LocalStorageService} from './local-storage.service';
import {BankStorageService} from "./bank-storage.service";
import {Operation, Transaction} from "../interfaces/transaction";
import {StorageKeys} from "../consts/storage-keys";

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let bankService: BankStorageService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    bankService = TestBed.inject(BankStorageService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should persist transaction in local storage', () => {
    bankService.deposit(1000)
    const storage = localStorage.getItem(StorageKeys.TRANSACTIONS)
    let transactions: Transaction[] = []
    bankService.getSortedHistory().subscribe(t => {
      transactions = t
      expect(storage).toEqual(JSON.stringify(transactions))
    })
  });

  it('should bankService load transaction from local storage', () => {
    localStorage.setItem(StorageKeys.TRANSACTIONS, JSON.stringify([<Transaction>{
      type: Operation.deposit, balance: 1000, date: new Date(), balanceAfter: 1000, balanceBefore: 0
    }]))

    let t: Transaction[] = service.loadData()


    expect(t[0].balance).toEqual(1000)
    expect(t[0].balanceBefore).toEqual(0)
    expect(t[0].balanceAfter).toEqual(1000)
    expect(t[0].type).toEqual(Operation.deposit)
    expect(t[0].date).toBeInstanceOf(String)
  });
});
