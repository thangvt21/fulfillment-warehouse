import { Component, OnInit } from '@angular/core';
import { Accounts } from 'src/app/accounts/accounts';
import { AccountsService } from 'src/app/accounts/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
    Accounts:Accounts[] = [];
    constructor(private AccountService:AccountsService) {}

    ngOnInit(): void {
      this.getAPI();
  }

    getAPI(){
      this.AccountService.get()
      .subscribe((data)=>{
        this.Accounts = data;
      })
    }
}
