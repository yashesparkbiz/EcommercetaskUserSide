import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categories } from '../_models/categories.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }
  list?: Categories[];

  get() : Observable<Array<Categories>> {
    return this.http.get<Array<Categories>>("https://localhost:7180/ProductCategory/get-all-productcategory", { headers: this.headers });
  }
}