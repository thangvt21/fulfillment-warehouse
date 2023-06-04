import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountsService } from '../accounts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Accounts } from '../accounts';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {
  hide = true;
  constructor(private fb:FormBuilder,
              private AccountsService:AccountsService,
              private route:ActivatedRoute,
              private router:Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.route.paramMap.subscribe((param)=>{
      let id = Number(param.get('id'));
      this.getbyID(id);
    });
  }

  updateAccountForm = this.fb.group({
    id: [0],
    username: [''],
    password: [''],
    role: [''],
  });

  getbyID(id:number){
    this.AccountsService.getByID(id)
    .subscribe((response)=>{
      this.updateAccountForm.setValue(response);
    })
  }

  update(){
    this.AccountsService.update((this.updateAccountForm.value as Accounts))
    .subscribe(()=>{
      this.router.navigate(["/"]);
    });
  }
}
