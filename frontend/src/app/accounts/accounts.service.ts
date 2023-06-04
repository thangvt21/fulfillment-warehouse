import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accounts } from './accounts';
@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http:HttpClient) { }

  get(sortColumn: string, order: string, searchKey:string):Observable<Accounts[]>{
    let url = "http://localhost:3000/accounts?"
    if(sortColumn && order){
      url = `${url}_sort=${sortColumn}&_order=${order}`
    }
    if(searchKey){
      if(url.indexOf("&") > -1){
        url = `${url}&q=${searchKey}`;
      } else {
        url = `${url}q=${searchKey}`;
      }
    }
    return this.http.get<Accounts[]>(url);
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
