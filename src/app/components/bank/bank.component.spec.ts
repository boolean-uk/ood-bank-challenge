import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BankComponent} from './bank.component';
import {DepositComponent} from "../deposit/deposit.component";
import {WithdrawComponent} from "../withdraw/withdraw.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";

describe('BankComponent', () => {
  let component: BankComponent;
  let fixture: ComponentFixture<BankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, MatTableModule],
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
