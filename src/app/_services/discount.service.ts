import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Discount } from '../_models/discount.model';
import { AuthenticationService } from './authentication.service';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private headers!: HttpHeaders;
  
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private authservice: AuthenticationService) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getdiscountbyproductid(product_Id : number): Observable<Array<Discount>>{
    debugger
    return this.http.get<Array<Discount>>("https://localhost:7180/Discount/get-discount-byproductid/" + product_Id, { headers: this.headers });
  }
}