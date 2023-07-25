import { Injectable } from '@angular/core';
import { Account, BankStatement } from '../../../src/account'; 
import { Transaction } from '../../../src/transaction'; 

@Injectable({
  providedIn: 'root'
})
export class BankService {

  account: Account;

  constructor() {
    this.account = new Account();
    // this.account.deposit(new Date('2012-01-10'), 1000);
  }

  getBankStatement(): string {
    const bankStatement = new BankStatement(this.account);
    return bankStatement.printStatement();
  }

  generateBankStatement(startDate: Date, endDate:Date): string {
    const bankStatement = new BankStatement(this.account);
    return bankStatement.generateStatement(startDate, endDate);
  }

}
