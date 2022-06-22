import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public isUserAuthenticated!: boolean;
  public UserId! : number;
  

  constructor(public route: Router, private authService: AuthenticationService) { }
  ngOnInit(): void {
    // this.authService.authChanged.subscribe(res => {
    //   this.isUserAuthenticated = res; 
    //   console.log("isUserAuthenticated="+this.isUserAuthenticated);
    //   if(this.isUserAuthenticated == false || this.isUserAuthenticated == undefined)
    //   {
    //     this.route.navigate(['/authentication/login']);
    //   };
    // });
    
  }
}