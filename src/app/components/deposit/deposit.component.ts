import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BankStorageService} from "../../services/bank-storage.service";

@Component({
  selector: 'app-deposit', templateUrl: './deposit.component.html', styleUrls: ['./deposit.component.scss']
})
export class DepositComponent {
  minDeposit: number = 1
  depositForm: FormGroup = this.fb.group({
    amount: [this.minDeposit, [Validators.required, Validators.min(this.minDeposit)]]
  });

  constructor(
    private bankService: BankStorageService,
    private fb: FormBuilder,
  ) {
  }

  deposit(): void {
    this.bankService.deposit(this.depositForm.controls['amount'].value)
  }
}
