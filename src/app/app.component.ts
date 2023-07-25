import {Component, OnInit} from '@angular/core';
import {BankStorageService} from "./services/bank-storage.service";

@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ood-bank-challenge';

  constructor(private bankService: BankStorageService) {

  }

  ngOnInit(): void {
    this.bankService.loadData()
  }
}
