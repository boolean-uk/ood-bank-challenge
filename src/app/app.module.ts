import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountComponent } from './components/account/account.component';
import { FormatMoneyPipe } from './pipes/format-money.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AccountListComponent,
    AccountComponent,
    FormatMoneyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
