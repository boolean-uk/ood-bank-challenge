import {Component} from '@angular/core';
import {BankStorageService} from "../../services/bank-storage.service";


@Component({
  selector: 'app-bank', templateUrl: './bank.component.html', styleUrls: ['./bank.component.scss']
})
export class BankComponent {

  constructor(private bankService: BankStorageService) {
  }

  getBankBalance() {
    return this.bankService.balance
  }

}
