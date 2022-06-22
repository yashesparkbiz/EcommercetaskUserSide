import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_interfaces/user';
import { Users } from '../_models/user.model';
import { AuthResponseDto } from '../_interfaces/responce';
import { Observable, Subject } from 'rxjs';
import { EnvironmentUrlService } from './environment-url.service';
import { UsersModel } from '../_interfaces/user-for-registration-dto';
import { RegistrationResponseDto } from '../_interfaces/registration-response-dto';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private headers: HttpHeaders;
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();
  user!: User;
  public isauthenticate!: boolean;

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  public registerUser = (route: string, body: UsersModel) => {
    return this.http.post<RegistrationResponseDto> (this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }

  public loginUser = (route: string, body: User) => {
    return this.http.post<AuthResponseDto>(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    debugger
    this.authChangeSub.next(isAuthenticated);
    this.isauthenticate = isAuthenticated;
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  public logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    this.sendAuthStateChangeNotification(false);
  }

  public getuserbyemail(email:string) : Observable<Users>{
    return this.http.get<Users>("https://localhost:7180/Users/get-user-byemail/"+email, { headers: this.headers });
  }
}