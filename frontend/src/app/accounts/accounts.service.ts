import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accounts } from './accounts';
@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http:HttpClient) { }

  get():Observable<Accounts[]>{
    return this.http.get<Accounts[]>("http://localhost:3000/accounts")
  }

  create(payload:Accounts){
    return this.http.post('http://localhost:3000/accounts',payload);
  }
}
