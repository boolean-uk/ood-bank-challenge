import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Account } from '../../../../src/account'; 
import { Transaction } from '../../../../src/transaction'; 
import { BankService } from '../bank-service.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {
  date: Date;
  amount: number;
  isDeposit: boolean;
  // bankStatement: string = "";
  // bankStatementBetween: string ="";
  transactions: Transaction[] = [];
  // startDate: Date;
  // endDate: Date;

  constructor(public bankService: BankService, private cdr: ChangeDetectorRef) {
    this.date = new Date()
    // this.startDate = new Date('1950-01-01');
    // this.endDate = new Date();
    this.amount = 0;
    this.isDeposit = false;
    this.transactions = bankService.account.getTransactions();
  }

  ngOnInit() {
    // this.getBankStatement();
    // this.getBankStatementBetween()
  }

  addTransaction() {
    if (!(this.date.toString().includes('GMT'))){
      console.log(this.date.toString())
      this.date = this.parseDateWithTime(this.date.toString())
    }
    console.log(this.date.toString())
    if (this.isDeposit) {
      this.bankService.account.deposit(this.date, this.amount);
    } else {
      this.bankService.account.withdraw(this.date, this.amount);
    }
    const currentDate = new Date();
    this.date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    this.amount = 0;
    this.isDeposit = false;
    this.transactions = this.bankService.account.getTransactions();
    this.cdr.detectChanges();
    // this.getBankStatement();
    // this.getBankStatementBetween()
  }

  formatDate(date: Date): string {
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  
    return formattedDate;
  }

  parseDateWithTime(dateString: string, hours: number = 0, minutes: number = 0, seconds: number = 0, milliseconds: number = 0): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
    return date;
  }
  

  // getBankStatement() {
  //   this.bankStatement = this.bankService.getBankStatement();
  // }

  // getBankStatementBetween() {
  //   this.bankStatementBetween = this.bankService.generateBankStatement(this.startDate, this.endDate);
  //   // this.startDate = new Date('1950-01-01');
  //   // this.endDate = new Date();
  // }
}

