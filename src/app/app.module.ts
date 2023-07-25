import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {BankComponent} from './components/bank/bank.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DepositComponent} from './components/deposit/deposit.component';
import {WithdrawComponent} from './components/withdraw/withdraw.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [AppComponent, BankComponent, DepositComponent, WithdrawComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
