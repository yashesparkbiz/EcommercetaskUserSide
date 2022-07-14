import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { TokenModel } from '../_models/token-model';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService, private authenticationService:AuthenticationService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem("token");
    const refreshToken =  localStorage.getItem("refreshToken") ? localStorage.getItem("refreshToken") : "";
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      console.log(this.jwtHelper.decodeToken(token))
      return true;
    }
    if (!token) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      return false;
    }
    if(this.jwtHelper.isTokenExpired(token))
    {
      const tokendata:TokenModel ={
        accessToken: token,
        refreshToken: refreshToken ? refreshToken : ""
      }
      this.authenticationService.refreshtoken(tokendata).subscribe(res => {
        localStorage.setItem("token", res.accessToken);  
        localStorage.setItem("refreshToken", res.refreshToken);
      })
      return true;
    }
    return false;
  }
  
}
