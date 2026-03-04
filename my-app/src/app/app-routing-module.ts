import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { CourseRegistration } from './course-registration/course-registration';
import { Mathcomponent } from './mathcomponent/mathcomponent';
import { FakeProductComponent } from './fake-product/fake-product';
import { FakeProductBasicComponent } from './fake-product-basic/fake-product-basic';
import { CoinDeskComponent } from './coindesk/coindesk';
import { ServiceProductImageEventComponent } from './service-product-image-event/service-product-image-event';
import { ServiceProductImageEventDetailComponent } from './service-product-image-event-detail/service-product-image-event-detail';
import { ProductComponent } from './product/product';
import { ListProductComponent } from './list-product/list-product';
import { ServiceProductComponent } from './service-product/service-product';
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
import { FileUploadComponent } from './file-upload/file-upload';
import { BookComponent } from './book-component/book-component';
import { BookDetailComponent } from './book-detail-component/book-detail-component';
import { NewBookComponent } from './new-book-component/new-book-component';
import { BookEditComponent } from './book-edit-component/book-edit-component';
import { FashionComponent } from './fashion/fashion.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentResultComponent } from './payment-result/payment-result.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';

const routes: Routes = [
  { path: 'ex21', component: LoginComponent },
  { path: 'ex22', component: CourseRegistration },
  { path: 'ex24', component: Mathcomponent },
  { path: 'ex26', component: FakeProductBasicComponent },
  { path: 'ex27', component: FakeProductComponent },
  { path: 'ex28', component: CoinDeskComponent },
  { path: 'ex13', component: ServiceProductImageEventComponent },
  { path: 'service-product-image-event', component: ServiceProductImageEventComponent },
  { path: 'service-product-image-event/:id', component: ServiceProductImageEventDetailComponent },
  { path: 'product', component: ProductComponent },
  { path: 'list-product', component: ListProductComponent },
  { path: 'service-product', component: ServiceProductComponent },
  { path: 'khach-hang-1', component: Customer1Component },
  { path: 'khach-hang-2', component: Customer2Component },
  { path: 'khach-hang-3', component: Customer3Component },
  { path: 'san-pham-1', component: ProductComponent },
  { path: 'san-pham-1/:id', component: ProductDetailComponent },
  { path: 'san-pham-3', component: Product3Component },
  { path: 'san-pham-4', component: Product4Component },
  { path: 'ex39', component: BookComponent },
  { path: 'ex41', component: BookDetailComponent },
  { path: 'ex41/:id', component: BookDetailComponent },
  { path: 'ex43', component: NewBookComponent },
  { path: 'ex50/:id', component: BookEditComponent },
  { path: 'ex49', component: FileUploadComponent },
  { path: 'ex53', component: FashionComponent },
  { path: 'momo', component: PaymentComponent },
  { path: 'payment-result', component: PaymentResultComponent },
  { path: 'momo-history', component: PaymentHistoryComponent },
  { path: 'html-dom', component: HtmlDomComponent },
  { path: 'ngon-ngu-asp', component: AspLanguageComponent },
  { path: 'gioi-thieu', component: About },
  { path: 'history', component: PaymentHistoryComponent },
];

export const RoutingComponents = [
  ProductComponent,
  ListProductComponent,
  ServiceProductComponent,
  Customer1Component,
  Customer2Component,
  Customer3Component,
  Product3Component,
  Product4Component,
  ProductDetailComponent,
  InternalApiComponent,
  HtmlDomComponent,
  AspLanguageComponent,
  FileUploadComponent,
  BookComponent,
  BookDetailComponent,
  NewBookComponent,
  BookEditComponent,
  FashionComponent,
  PaymentComponent,
  PaymentResultComponent,
  PaymentHistoryComponent,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
