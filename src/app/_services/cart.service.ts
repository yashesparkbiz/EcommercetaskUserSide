import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ProductCart_Model } from '../_components/cart/cart.component';
import { HttpInterceptorInterceptor } from '../_Intercepters/http-interceptor.interceptor';
import { ProductCartModel } from '../_interfaces/cartinterface';
import { Cart } from '../_models/cart.model';
import { Order } from '../_models/order.model';
import { AuthenticationService } from './authentication.service';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private headers!: HttpHeaders;
  
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private authservice: AuthenticationService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  
  public addtocart(body: ProductCartModel): Observable<any> {
    debugger
    var token = localStorage.getItem('token');
    const headeraddtocart = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const head = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    })
    return this.http.post<any>("https://localhost:7180/ProductCart/add-product-cart", JSON.stringify(body), { headers: this.headers });
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  public getcartbyuserid(UserId: number): Observable<Array<ProductCart_Model>> {
    debugger
    return this.http.get<Array<ProductCart_Model>>("https://localhost:7180/ProductCart/get-product-cartbyuserid/" + UserId, { headers: this.headers });
  }

  public addOrder(body: Order){
    return this.http.post<any>("https://localhost:7180/Orders/add-orders", JSON.stringify(body), { headers: this.headers });
  }
}