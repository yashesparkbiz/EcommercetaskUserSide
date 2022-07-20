import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../_interfaces/user';
import { Users } from '../_models/user.model';
import { AuthResponseDto } from '../_interfaces/responce';
import { Observable, Subject } from 'rxjs';
import { EnvironmentUrlService } from './environment-url.service';
import { UsersModel } from '../_interfaces/user-for-registration-dto';
import { RegistrationResponseDto } from '../_interfaces/registration-response-dto';
import { TokenModel } from '../_models/token-model';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ExternalAuthDto } from '../_interfaces/external-auth-dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private headers: HttpHeaders;
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();
  private extAuthChangeSub = new Subject<SocialUser>();
  public extAuthChanged = this.extAuthChangeSub.asObservable();
  user!: User;
  public isauthenticate!: boolean;

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private externalAuthService: SocialAuthService, private router: Router) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    this.externalAuthService.authState.subscribe({
      next:  (user: any) => {
        debugger
        console.log(user);
        if (user.email != "") {
          this.exLogin();
        }
        this.extAuthChangeSub.next(user);
      },
      error: (err: HttpErrorResponse) => {
        alert(err);
      }
    });
  }

  public registerUser = (route: string, body: UsersModel) => {
    debugger
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
    localStorage.clear();
    this.sendAuthStateChangeNotification(false);
  }

  public getuserbyemail(email:string) : Observable<Users>{
    return this.http.get<Users>("https://localhost:7180/Users/get-user-byemail/"+email, { headers: this.headers });
  }

  public refreshtoken(tokenModel:TokenModel): Observable<TokenModel>{
    return this.http.post<TokenModel>("https://localhost:7180/Users/refresh-token", JSON.stringify(tokenModel), { headers: this.headers });
  }

  public signInWithGoogle = ()=> {
    this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  public signOutExternal = () => {
    this.externalAuthService.signOut();
  }

  public externalLogin = (route: string, body: ExternalAuthDto) => {
    debugger
    return this.http.post<AuthResponseDto>(this.createCompleteRoute(route, 'https://localhost:7180'), body);
  }

  exLogin = () => {
    debugger
    this.signInWithGoogle();
    this.extAuthChanged.subscribe({next: async (user: any) => {
      debugger
      const externalAuth: ExternalAuthDto = {
        in: {
          provider: user.provider,
          idToken: user.idToken
        }
      }
      this.validateExternalAuth(externalAuth);
    },
    error: (err: any) => {
      debugger
      console.log(err);
    }})
  }

  private  validateExternalAuth(externalAuth: ExternalAuthDto) {
    debugger
     this.externalLogin('Users/ExternalLogin', externalAuth)
      .subscribe({
        next: async (res:any) => {
          console.log(res);
          localStorage.setItem("token", res.token);
          localStorage.setItem("refreshToken", res.refreshToken);
          this.sendAuthStateChangeNotification(res.isAuthSuccessful);
          this.router.navigate([""]);
        },
        error: (err: HttpErrorResponse) => {
          this.signOutExternal();
        }
      });
  }
}