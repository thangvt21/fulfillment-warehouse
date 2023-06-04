import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/all-accounts/accounts.component';
import { CreateAccountComponent } from './accounts/add-account/add-account.component';
import { EditAccountComponent } from './accounts/edit-account/edit-account.component';
import { AllProductsComponent } from './core/product/all-products/all-products.component';
import { CreateProductsComponent } from './core/product/create-products/create-products.component';
import { EditProductsComponent } from './core/product/edit-products/edit-products.component';

const routes: Routes = [
  { path: 'account', component: AccountsComponent}, //admin
  { path: 'account/create', component: CreateAccountComponent },
  { path: 'account/edit/:id', component: EditAccountComponent },
  { path: 'product', component: AllProductsComponent },
  { path: 'product/create', component: CreateProductsComponent },
  { path: 'product/edit/:id', component: EditProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
