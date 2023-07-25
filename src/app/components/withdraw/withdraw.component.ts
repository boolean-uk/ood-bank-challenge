import {Component} from '@angular/core';
import {BankStorageService} from "../../services/bank-storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent {

  withdrawForm: FormGroup = this.fb.group({
    amount: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(private bankService: BankStorageService, private fb: FormBuilder) {
  }

  withdraw() {
    this.bankService.deposit(this.withdrawForm.controls['amount'].value)
  }
}
