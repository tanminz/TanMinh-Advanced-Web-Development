import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { CourseRegistration } from './course-registration/course-registration';
import { Mathcomponent } from './mathcomponent/mathcomponent';
import { FakeProductComponent } from './fake-product/fake-product';
import { CoinDeskComponent } from './coindesk/coindesk';

const routes: Routes = [
  { path: 'ex21', component: LoginComponent },
  { path: 'ex22', component: CourseRegistration },
  { path: 'ex24', component: Mathcomponent },
  { path: 'ex26', component: FakeProductComponent },
  { path: 'ex27', component: FakeProductComponent },
  { path: 'ex28', component: CoinDeskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
