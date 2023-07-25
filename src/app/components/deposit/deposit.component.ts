import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {BankStorageService} from "../../services/bank-storage.service";

@Component({
  selector: 'app-deposit', templateUrl: './deposit.component.html', styleUrls: ['./deposit.component.scss']
})
export class DepositComponent {

  amount: FormControl = new FormControl;

  constructor(private bankService: BankStorageService) {
  }

  deposit() {
    this.bankService.deposit(this.amount.value)
  }
}
