import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isUserAuthenticated!: boolean;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.authChanged.subscribe(res => {this.isUserAuthenticated = res; console.log("isUserAuthenticated="+this.isUserAuthenticated); })
    var token = localStorage.getItem("token");
    if(token!=undefined && token!='')
    {
      this.isUserAuthenticated = true;
    }
    else
    {
      this.isUserAuthenticated = false;
    }
  }

  public logout = () => {
    this.authService.logout();
    this.router.navigate([""]);
  }
}