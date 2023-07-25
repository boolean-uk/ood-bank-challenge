import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/domain/account';
import { JSONStatement } from 'src/domain/statement';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  
  account?: Account

  depositError: string | null = null;
  withdrawError: string | null = null;

  constructor(private router: ActivatedRoute, private accountService: AccountService) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const accountId = Number(params.get("accountId"))
      this.accountService.getAccounts().subscribe(accounts => this.account = accounts[accountId])
    })
  }

  getTransactions(account?: Account): { [key: string]: string }[] {
    if(account == null)
      return []

    return new JSONStatement(account).generateData()
  }

  deposit(value: string) {
    this.depositError = null

    const amount = Number(value)
    if(isNaN(amount) || amount <= 0) {
      this.depositError = "Incorrect value."
      return
    }

    try {
      this.account?.deposit(amount * 100, new Date())
    } catch(error) {
      this.depositError = error as string
    }
  }

  withdraw(value: string) {
    this.withdrawError = null

    const amount = Number(value)
    if(isNaN(amount) || amount <= 0) {
      this.withdrawError = "Incorrect value."
      return
    }

    try {
      this.account?.withdraw(amount * 100, new Date())
    } catch(error) {
      this.withdrawError = error as string
    }
  }
}
