import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Accounts } from 'src/app/accounts/accounts';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { DeleteDialogAccountsComponent } from '../delete-dialog-accounts/delete-dialog-accounts.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
    Accounts:Accounts[] = [];
    sortingControl = new FormControl('');
    searchControl = new FormControl('');
    constructor(private AccountService:AccountsService,
                private dialog:MatDialog) {}

    ngOnInit(): void {
      this.getAPI('','','');
      this.sortingControl.valueChanges.subscribe((value)=> {
        if(value){
          let sortData = this.doSorting(value);
          this.getAPI(sortData.sortColumn, sortData.order, this.sortingControl.value ?? '');
        }
      })
  }
    textSearch(){
      let sortData = this.doSorting(this.sortingControl.value ?? '');
          this.getAPI(sortData.sortColumn, sortData.order, this.sortingControl.value ?? '');
      this.getAPI(
        sortData.sortColumn,
        sortData.order,
        this.searchControl.value?? ''
      );
    }

    doSorting(value: string) {
      let sortColumn:string = '';
      let order:string = '';
      if(value === 'id-by-desc'){
        sortColumn = 'id';
        order = 'desc';
      } else if(value === 'id-by-asc') {
        sortColumn = 'id';
        order = 'asc';
      }
      // this.getAPI(sortColumn, order,'');
      return {
        sortColumn,
        order
      }
    }

    getAPI(sortColumn: string, order: string, searchKey: string){
      this.AccountService.get(sortColumn, order, searchKey)
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
