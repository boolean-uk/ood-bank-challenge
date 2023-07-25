import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account, CheckingAccount, InvestmentAccount, SavingAccount } from 'src/domain/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accounts: Account[] = []

  constructor() {
    const account = new CheckingAccount("1234")
    this.accounts.push(account)
    account.deposit(10000, new Date())
    account.withdraw(5000, new Date())
  }

  getAccounts(): Observable<Account[]> {
    return of(this.accounts)
  }

  createAccount(type: string) {
    const number = ("" + Math.random()).substring(2)
    let account: Account;
    
    switch(type) {
      case "checking":
        account = new CheckingAccount(number)
        break
      case "saving":
        account = new SavingAccount(number)
        break
      case "investment":
        account = new InvestmentAccount(number, 2)
        break
    }

    this.accounts.push(account!)
  }
}
