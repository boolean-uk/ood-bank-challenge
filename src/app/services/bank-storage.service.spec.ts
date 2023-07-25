import {TestBed} from '@angular/core/testing';

import {BankStorageService} from './bank-storage.service';
import {Operation} from "../interfaces/transaction";


describe('BankStorageService', () => {
  let service: BankStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should deposit balance', () => {
    expect(service.balance).toEqual(0)
    service.deposit(1000)
    expect(service.balance).toEqual(1000)
  })

  it('should withdraw balance', () => {
    service.deposit(1000)
    service.withdraw(100)
    expect(service.balance).toEqual(900)
  })

  it('should add deposit to history', () => {
    service.deposit(1000)
    expect(service.history.length === 1)
    expect(service.history[0].balance).toEqual(1000)
    expect(service.history[0].balanceBefore).toEqual(0)
    expect(service.history[0].balanceAfter).toEqual(1000)
    expect(service.history[0].date).toBeInstanceOf(Date)
    expect(service.history[0].type).toEqual(Operation.deposit)

  })
});
