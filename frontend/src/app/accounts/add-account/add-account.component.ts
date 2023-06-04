import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Accounts } from '../accounts';
import { AccountsService } from '../accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class CreateAccountComponent {
  hide = true;
  constructor(private fb:FormBuilder,
              private AccountsService:AccountsService,
              private router:Router) {}

  createAccountForm = this.fb.group({
    username: [''],
    password: [''],
    role: [''],
  });

  create(){
    this.AccountsService.create(this.createAccountForm.value as Accounts).subscribe(() => {
      this.router.navigate(['/account']);
    })
  }
}
