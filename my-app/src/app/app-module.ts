import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Ex3 } from './ex3/ex3';

import { Learnbinding } from './learnbinding/learnbinding';
import { Ptb1 } from './ptb1/ptb1';
import { Ptb2 } from './ptb2/ptb2';
import { Learndirective } from './learndirective/learndirective';
import { Lunaryear } from './lunaryear/lunaryear';
import { Customer } from './customer/customer';
import { CustomerService } from './customer-service/customer-service';
import { Listcustomer2 } from './listcustomer2/listcustomer2';
import { Customerdetail } from './customerdetail/customerdetail';
import {HttpClientModule} from '@angular/common/http';
import { Exercise14 } from './exercise14/exercise14';
import { Listcustomers } from './listcustomers/listcustomers';


@NgModule({
  declarations: [
    App,
    About,
    Contact,
    Ex3,
    Exercise14,   // ✅ ĐÚNG
    Learnbinding,
    Ptb1,
    Ptb2,
    Learndirective,
    Lunaryear,
    Customer,
    Listcustomer2,
    Listcustomers,
    Customerdetail
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }

