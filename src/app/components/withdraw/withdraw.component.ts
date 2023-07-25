import {Component} from '@angular/core';
import {BankStorageService} from "../../services/bank-storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-withdraw', templateUrl: './withdraw.component.html', styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent {

  minWithdraw: number = 1;
  withdrawForm: FormGroup = this.fb.group({
    amount: [this.minWithdraw, [Validators.required, Validators.min(this.minWithdraw)]]
  });

  constructor(private bankService: BankStorageService, private fb: FormBuilder) {
  }


  withdraw(): void {
    this.bankService.withdraw(this.withdrawForm.controls['amount'].value)
  }

  isInvalid(): boolean {
    return this.withdrawForm.invalid || this.withdrawForm.controls['amount'].value > this.bankService.getCalculateBalance()
  }
}
