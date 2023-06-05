import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Import } from "../interfaces/import";

@Injectable({
  providedIn: "root",
})
export class ImportService {
  constructor(private http: HttpClient) {}

  get(
    sortColumn: string,
    order: string,
    searchKey: string,
    currPage: number,
    pageSize: number
  ): Observable<HttpResponse<any>> {
    let url = `http://localhost:3000/listImports?_page=${currPage}&_limit=${pageSize}`;
    if (sortColumn && order) {
      url = `${url}&_sort=${sortColumn}&_order=${order}`;
    }
    if (searchKey) {
      url = `${url}&q=${searchKey}`;
    }
    return this.http.get<HttpResponse<any>>(url, { observe: "response" });
  }

  create(payload: Import) {
    return this.http.post("http://localhost:3000/listImports", payload);
  }

  getByID(id: number): Observable<Import> {
    return this.http.get<Import>(`http://localhost:3000/listImports/${id}`);
  }

  update(payload: Import) {
    return this.http.put(
      `http://localhost:3000/listImports/${payload.id}`,
      payload
    );
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/listImports/${id}`);
  }
}
