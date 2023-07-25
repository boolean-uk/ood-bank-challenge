import {TestBed} from '@angular/core/testing';

import {BankStorageService} from './bank-storage.service';

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
});
