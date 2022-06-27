import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orderdetails } from '../_interfaces/orderdetails';
import { AuthenticationService } from './authentication.service';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {

  private headers!: HttpHeaders;

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private authservice: AuthenticationService) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public addOrderDetails(body: Orderdetails){
    return this.http.post<any>("https://localhost:7180/OrderDetails/add-order-details", JSON.stringify(body), { headers: this.headers });
  }
}
