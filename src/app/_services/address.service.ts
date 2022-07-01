import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../_interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private headers!: HttpHeaders;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  public addAddress(body: Address){
    debugger
    return this.http.post<any>("https://localhost:7180/Address/add-address", JSON.stringify(body), { headers: this.headers });
  }
}
