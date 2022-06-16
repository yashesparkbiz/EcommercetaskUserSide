import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from './products.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }
  getbysubcategoryid(subcategoryid:number): Observable<Array<Products>> {
    return this.http.get<Array<Products>>("https://localhost:7180/Product/get-products-bysubcategoryid/"+subcategoryid, { headers: this.headers });
  } 
}