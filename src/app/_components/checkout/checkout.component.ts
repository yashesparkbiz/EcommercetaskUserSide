import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  UserId!: number;
  isUserAuthenticated!: boolean;

  constructor(public route: Router, private authService: AuthenticationService, ) { }

  ngOnInit(): void {
    this.authService.authChanged.subscribe(res => {
      this.isUserAuthenticated = res;
      console.log("isUserAuthenticated=" + this.isUserAuthenticated);
      if (this.isUserAuthenticated == false || this.isUserAuthenticated == undefined) {
        this.route.navigate(['/authentication/login']);
      };
    });
    this.UserId = (Number)(localStorage.getItem('id')?.toString());
    // this.getcartbyUserId(this.UserId);
  }

}
