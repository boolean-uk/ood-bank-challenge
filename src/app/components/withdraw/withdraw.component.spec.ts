import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WithdrawComponent} from './withdraw.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('WithdrawComponent', () => {
  let component: WithdrawComponent;
  let fixture: ComponentFixture<WithdrawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [WithdrawComponent]
    });
    fixture = TestBed.createComponent(WithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
