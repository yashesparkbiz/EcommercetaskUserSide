import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cartinterface } from '../_interfaces/cartinterface';
import { Cart } from '../_models/cart.model';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private headers!: HttpHeaders;
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }
  public addtocart(body: Cartinterface): Observable<number> {
    debugger 
    return this.http.post<number>("https://localhost:7180/ProductCart/add-product-cart", body);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  public getcartbyuserid(id:number): Observable<Array<Cart>> {
    return this.http.get<Array<Cart>>("https://localhost:7180/Product/get-products-bysubcategoryid/"+id, { headers: this.headers });
  }
}