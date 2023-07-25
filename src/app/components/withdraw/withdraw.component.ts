import {Component} from '@angular/core';
import {BankStorageService} from "../../services/bank-storage.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent {

  amount: FormControl = new FormControl;
  constructor(private bankService: BankStorageService) {
  }

  withdraw() {
    this.bankService.withdraw(this.amount.value)
  }
}
