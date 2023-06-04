import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/all-accounts/accounts.component';
import { CreateAccountComponent } from './accounts/add-account/add-account.component';
import { EditAccountComponent } from './accounts/edit-account/edit-account.component';
const routes: Routes = [
  {
    path: '',
    component: AccountsComponent
  },
  {
    path: 'accounts/create',
    component: CreateAccountComponent
  },
  {
    path: 'edit/:id',
    component: EditAccountComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
