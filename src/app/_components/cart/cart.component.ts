import { formatNumber } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/_interfaces/order';
import { Discount } from 'src/app/_models/discount.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CartService } from 'src/app/_services/cart.service';
import { DiscountService } from 'src/app/_services/discount.service';
import { OrderService } from 'src/app/_services/order.service';
import { OrderdetailsService } from 'src/app/_services/orderdetails.service';
import { Orderdetails } from '../../_interfaces/orderdetails';

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
  public total_amount: number = 0;
  public total_discount!: number;

  constructor(public route: Router, private authService: AuthenticationService, private cartservice: CartService, private discountService: DiscountService,
    private orderService: OrderService, private orderdetailsService: OrderdetailsService) { }

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

  takeConfirmation() {
    if (this.carts.length > 0) {
      var orderid!: number;
      for (let i = 0; i < this.carts.length; i++) {
        var quantity = (<HTMLSelectElement>document.getElementById('q' + i)).value.toString();
        var token = localStorage.getItem("token");
        if (token != undefined && token != '') {
          this.total_amount = this.total_amount + (this.carts[i].price * parseInt(quantity));
        }
      }

      if (this.total_amount != null) {
        const order: Order = {
          in: {
            id: 0,
            total_Amount: this.total_amount,
            total_Discount: 10.33,
            user_Id: (Number)(localStorage.getItem('id')?.toString())
          }
        }
        this.orderService.addOrder(order).subscribe(res => { alert(res); orderid = res; });
      }
      else {
        alert("plaese select valid quantity");
      }

      //----------------------------------------------------------------------------------------------------------------------

      for (let i = 0; i < this.carts.length; i++) {
        debugger
        var token = localStorage.getItem("token");
        if (token != undefined && token != '') {
          var discount!: Array<Discount>
          this.discountService.getdiscountbyproductid(this.carts[i].product_Id).subscribe(res => { discount = res; });
          alert(discount);
          if (discount != undefined && discount.length > 0) {
            const orderdetailsitem: Orderdetails =
            {
              in: {
                id: 0,
                product_Id: this.carts[i].product_Id,
                quantity: (Number)(document.getElementById('q' + i)),
                order_Id: orderid,
                status: "pending",
                discount_Id: discount[0].id
              }
            }
            this.orderdetailsService.addOrderDetails(orderdetailsitem).subscribe(res => { 
              
            });
          }
        }
      }
    }
    var check = confirm('Are you sure you want to make purchase?');
    if (check == true) {
      this.route.navigate(['/checkout']);
    }
  }

  removecartitem(CartId: number, product_Id: number) {
    alert(CartId);
    this.cartservice.removecartbycartid(CartId, product_Id).subscribe(res => { alert(res + " item deleted successfully"); });
    this.getcartbyUserId((Number)(localStorage.getItem('id')?.toString()));
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
  productName!: string;
}