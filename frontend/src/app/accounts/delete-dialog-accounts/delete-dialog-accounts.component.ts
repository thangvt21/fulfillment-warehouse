import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-delete-dialog-accounts',
  templateUrl: './delete-dialog-accounts.component.html',
  styleUrls: ['./delete-dialog-accounts.component.css']
})
export class DeleteDialogAccountsComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDialogAccountsComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private AccountService:AccountsService){}

  confirmDel(){
    this.AccountService.delete(this.data.id)
    .subscribe(() =>{
      this.dialogRef.close(this.data.id);
    })
  }
}
