import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accounts } from '../interfaces/accounts';
@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http:HttpClient) { }

  onLogin(obj:any):Observable<any> {
    return this.http.post('http://localhost:3000/accounts', obj);
  }

  get(sortColumn: string, order: string, searchKey:string, currPage:number, pageSize:number):Observable<HttpResponse<any>>{
    let url = `http://localhost:3000/accounts?_page=${currPage}&_limit=${pageSize}`
    if(sortColumn && order){
      url = `${url}&_sort=${sortColumn}&_order=${order}`
    }
    if(searchKey){

        url = `${url}&q=${searchKey}`;

    }
    return this.http.get<HttpResponse<any>>(url, {observe: 'response'});
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
