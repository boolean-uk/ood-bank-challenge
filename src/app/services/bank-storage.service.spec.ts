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

  it('should throw error when trying withdraw more than current balance', () => {
    service.deposit(1000)

    expect(()=>{service.withdraw(10000)}).toThrowError("Not enough money!")
  })

  it('should add deposit to history', () => {
    service.deposit(1000)

    service.history.subscribe( history => {
      expect(history.length === 1)
      expect(history[0].balance).toEqual(1000)
      expect(history[0].balanceBefore).toEqual(0)
      expect(history[0].balanceAfter).toEqual(1000)
      expect(history[0].date).toBeInstanceOf(Date)
      expect(history[0].type).toEqual(Operation.deposit)
    })
  })

  it('should add withdraw to history', () => {
    service.deposit(1000)
    service.withdraw(100)

    service.history.subscribe( history => {
      expect(history.length === 2)
      expect(history[1].balance).toEqual(100)
      expect(history[1].balanceBefore).toEqual(1000)
      expect(history[1].balanceAfter).toEqual(900)
      expect(history[1].date).toBeInstanceOf(Date)
      expect(history[1].type).toEqual(Operation.withdraw)
    })
  })



});
