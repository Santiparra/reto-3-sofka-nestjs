import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './component/customer-form/customer-form.component';
import { CustomerComponent } from './component/customer/customer.component';

const routes: Routes = [
  {path: "", component: CustomerComponent},
  {path: "customer", component: CustomerComponent},
  {path: "customer/crear", component: CustomerFormComponent},
  {path: "customer/editar/:id", component: CustomerFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
