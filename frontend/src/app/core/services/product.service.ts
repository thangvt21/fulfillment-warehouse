import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  get(sortColumn: string, order: string, searchKey:string, currPage:number, pageSize:number):Observable<HttpResponse<any>>{
    let url = `http://localhost:3000/products?_page=${currPage}&_limit=${pageSize}`
    if(sortColumn && order){
      url = `${url}&_sort=${sortColumn}&_order=${order}`
    }
    if(searchKey){

        url = `${url}&q=${searchKey}`;

    }
    return this.http.get<HttpResponse<any>>(url, {observe: 'response'});
  }

  create(payload:Product){
    return this.http.post('http://localhost:3000/products',payload);
  }

  getByID(id:number):Observable<Product>{
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  update(payload:Product){
    return this.http.put(
      `http://localhost:3000/products/${payload.id}`,
       payload
    );
  }

  delete(id:number){
    return this.http.delete(`http://localhost:3000/accounts/${id}`);
  }
}
