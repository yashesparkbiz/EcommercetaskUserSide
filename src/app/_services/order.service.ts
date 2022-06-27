import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../_interfaces/order';
import { AuthenticationService } from './authentication.service';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private headers!: HttpHeaders;

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private authservice: AuthenticationService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public addOrder(body: Order){
    debugger
    return this.http.post<any>("https://localhost:7180/Orders/add-orders", JSON.stringify(body), { headers: this.headers });
  }
}
