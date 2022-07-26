import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../_models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  makepayment(stripeToken: Payment): Observable<string>{
    debugger
    return this.http.post<string>("https://localhost:7180/Orders/make-payment", JSON.stringify(stripeToken), { headers: this.headers });
  }
}