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

@NgModule({
  exports: [
    DepositComponent,
    WithdrawComponent
  ],
  declarations: [
    AppComponent,
    BankComponent,
    DepositComponent,
    WithdrawComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
