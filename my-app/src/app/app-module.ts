import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, RoutingComponents } from './app-routing-module';
import { App } from './app';
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
import { LoginComponent } from './login-component/login-component';
import { CourseRegistration } from './course-registration/course-registration';
import { Mathcomponent } from './mathcomponent/mathcomponent';
import { FakeProductComponent } from './fake-product/fake-product';
import { FakeProductBasicComponent } from './fake-product-basic/fake-product-basic';
import { CoinDeskComponent } from './coindesk/coindesk';
import { ServiceProductImageEventComponent } from './service-product-image-event/service-product-image-event';
import { ServiceProductImageEventDetailComponent } from './service-product-image-event-detail/service-product-image-event-detail';
import { Customer1Component } from './customer-1/customer-1';
import { Customer2Component } from './customer-2/customer-2';
import { Customer3Component } from './customer-3/customer-3';
import { Product3Component } from './product-3/product-3';
import { Product4Component } from './product-4/product-4';
import { InternalApiComponent } from './internal-api/internal-api';
import { HtmlDomComponent } from './html-dom/html-dom';
import { AspLanguageComponent } from './asp-language/asp-language';
import { About } from './about/about';
import { ProductDetailComponent } from './product-detail/product-detail';
import { Listcustomers } from './listcustomers/listcustomers';
import { Listcustomerba } from './listcustomerba/listcustomerba';
import { FileUploadComponent } from './file-upload/file-upload';
import { BookComponent } from './book-component/book-component';
import { BookDetailComponent } from './book-detail-component/book-detail-component';
import { NewBookComponent } from './new-book-component/new-book-component';
import { BookEditComponent } from './book-edit-component/book-edit-component';


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
    Customerdetail,
    LoginComponent,
    CourseRegistration,
    Mathcomponent,
    FakeProductBasicComponent,
    FakeProductComponent,
    CoinDeskComponent,
    ServiceProductImageEventComponent,
    ServiceProductImageEventDetailComponent,
    Customer1Component,
    Customer2Component,
    Customer3Component,
    Product3Component,
    Product4Component,
    ProductDetailComponent,
    Listcustomers,
    Listcustomerba,
    FileUploadComponent,
    BookComponent,
    BookDetailComponent,
    NewBookComponent,
    BookEditComponent,
    InternalApiComponent,
    HtmlDomComponent,
    AspLanguageComponent,
    ...RoutingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }

