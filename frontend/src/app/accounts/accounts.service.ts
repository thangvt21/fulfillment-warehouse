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

  getByID(id:number):Observable<Accounts>{
    return this.http.get<Accounts>(`http://localhost:3000/accounts/${id}`);
  }

  update(payload:Accounts){
    return this.http.put(
      `http://localhost:3000/accounts/${payload.id}`,
       payload
    );
  }

  delete(id:number){
    return this.http.delete(`http://localhost:3000/accounts/${id}`);
  }
}
