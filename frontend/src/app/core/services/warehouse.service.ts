import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Warehouse } from '../interfaces/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http:HttpClient) { }

  get(sortColumn: string, order: string, searchKey:string, currPage:number, pageSize:number):Observable<HttpResponse<any>>{
    let url = `http://localhost:3000/warehouses?_page=${currPage}&_limit=${pageSize}`
    if(sortColumn && order){
      url = `${url}&_sort=${sortColumn}&_order=${order}`
    }
    if(searchKey){

        url = `${url}&q=${searchKey}`;

    }
    return this.http.get<HttpResponse<any>>(url, {observe: 'response'});
  }

  create(payload:Warehouse){
    return this.http.post('http://localhost:3000/warehouses',payload);
  }

  getByID(id:number):Observable<Warehouse>{
    return this.http.get<Warehouse>(`http://localhost:3000/warehouses/${id}`);
  }

  update(payload:Warehouse){
    return this.http.put(
      `http://localhost:3000/warehouses/${payload.id}`,
       payload
    );
  }

  delete(id:number){
    return this.http.delete(`http://localhost:3000/warehouses/${id}`);
  }
}
