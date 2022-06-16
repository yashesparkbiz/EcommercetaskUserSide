import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subcategories } from './subcategories.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }
  getbyid(categoryid:number): Observable<Array<Subcategories>> {
    return this.http.get<Array<Subcategories>>("https://localhost:7180/ProductSubCategory/get-product-subcategorybycategoryid/"+categoryid, { headers: this.headers });
  } 
}