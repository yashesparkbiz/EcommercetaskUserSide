import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public isUserAuthenticated!: boolean;
  public UserId!: number;
  public carts!: Array<ProductCart_Model>;
  public TotalPrice: number = 0;

  constructor(public route: Router, private authService: AuthenticationService, private cartservice: CartService) { }
  ngOnInit(): void {
    this.authService.authChanged.subscribe(res => {
      this.isUserAuthenticated = res;
      console.log("isUserAuthenticated=" + this.isUserAuthenticated);
      if (this.isUserAuthenticated == false || this.isUserAuthenticated == undefined) {
        this.route.navigate(['/authentication/login']);
      };
    });
    this.UserId = (Number)(localStorage.getItem('id')?.toString());
    this.getcartbyUserId(this.UserId);
  }

  getcartbyUserId(UserId: number) {
    debugger
    this.cartservice.getcartbyuserid(UserId).subscribe(res => {
      this.carts = res;
      this.carts.forEach((obj) => { this.TotalPrice += obj.price })
    });
  }

  takeConfirmation(){
    var check = confirm('Are you sure you want to make purchase?');
    if(check == true)
    {
      
      this.route.navigate(['/checkout']);
    }
  }
  
}

export class ProductCart_Model {
  id!: number;
  product_Id!: number;
  quantity !: number;
  price!: number;
  user_Id!: number;
  is_Active!: number;
  image!: string;
  productName!:string;
}