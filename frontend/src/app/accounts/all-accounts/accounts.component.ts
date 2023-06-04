import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Accounts } from 'src/app/accounts/accounts';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { DeleteDialogAccountsComponent } from '../delete-dialog-accounts/delete-dialog-accounts.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
    Accounts:Accounts[] = [];
    constructor(private AccountService:AccountsService,
                private dialog:MatDialog) {}

    ngOnInit(): void {
      this.getAPI();
  }

    getAPI(){
      this.AccountService.get()
      .subscribe((data)=>{
        this.Accounts = data;
      })
    }

    deleteItem(id:number){
      const dialogRef = this.dialog.open(DeleteDialogAccountsComponent,{
        width: '250px',
        data: {id},
      });

      dialogRef.afterClosed().subscribe((result) =>{
        if(result){
          this.Accounts = this.Accounts.filter(_=>_.id !== result);
        }
      });
    }
}
