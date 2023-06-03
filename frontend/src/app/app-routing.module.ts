import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './core/accounts/accounts.component';
import { CreateAccountComponent } from './accounts/add-account/add-account.component';
const routes: Routes = [
  {
    path: '',
    component: AccountsComponent
  },
  {
    path: 'create',
    component: CreateAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
