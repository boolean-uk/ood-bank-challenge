import {Component} from '@angular/core';
import {BankStorageService} from "../../services/bank-storage.service";


@Component({
  selector: 'app-bank', templateUrl: './bank.component.html', styleUrls: ['./bank.component.scss']
})
export class BankComponent {

  columns: string[] = ["Date", "Type", "Balance", "Balance Before", "Balance After"]

  constructor(private bankService: BankStorageService) {
  }

  getBankBalance() {
    return this.bankService.balance
  }

  getBankHistory() {
    return this.bankService.history
  }

}
