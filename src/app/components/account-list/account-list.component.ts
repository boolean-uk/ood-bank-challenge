import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/domain/account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  accounts?: Account[]

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((accounts: Account[]) => this.accounts = accounts)
  }

  createAccount(type: string) {
    this.accountService.createAccount(type)
  }

}
