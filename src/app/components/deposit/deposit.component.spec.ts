import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DepositComponent} from './deposit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('DepositComponent', () => {
  let component: DepositComponent;
  let fixture: ComponentFixture<DepositComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule, FormsModule],
      declarations: [DepositComponent]
    });
    fixture = TestBed.createComponent(DepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
