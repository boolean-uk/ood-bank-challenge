import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BankComponent} from './bank.component';
import {DepositComponent} from "../deposit/deposit.component";
import {WithdrawComponent} from "../withdraw/withdraw.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

describe('BankComponent', () => {
  let component: BankComponent;
  let fixture: ComponentFixture<BankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, MatTableModule, MatInputModule, MatFormFieldModule, BrowserAnimationsModule, MatTooltipModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule],
      declarations: [BankComponent, DepositComponent, WithdrawComponent]
    });
    fixture = TestBed.createComponent(BankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
