import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BankStorageService} from "../../services/bank-storage.service";

@Component({
  selector: 'app-deposit', templateUrl: './deposit.component.html', styleUrls: ['./deposit.component.scss']
})
export class DepositComponent{
  depositForm: FormGroup = this.fb.group({
    amount: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(private bankService: BankStorageService, private fb: FormBuilder) {
  }

  deposit() {
    this.bankService.deposit(this.depositForm.controls['amount'].value)
  }



}
