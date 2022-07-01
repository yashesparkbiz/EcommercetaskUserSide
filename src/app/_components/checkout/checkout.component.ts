import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Orders } from 'src/app/_models/order.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { OrderService } from 'src/app/_services/order.service';
import { CartComponent } from '../cart/cart.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Address } from 'src/app/_interfaces/address';
import { AddressService } from 'src/app/_services/address.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  UserId!: number;
  isUserAuthenticated!: boolean;
  orderid!: number;
  orderdata!: Orders;
  formdata!: FormGroup;
  constructor(public router: Router, private authService: AuthenticationService, private route: ActivatedRoute, private orderService: OrderService, private addressService: AddressService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')?.toString() != undefined || localStorage.getItem('token')?.toString() != "") {
      this.route.params.subscribe((params: Params) => this.orderid = params['orderid']);

      this.authService.authChanged.subscribe(res => {
        this.isUserAuthenticated = res;
        console.log("isUserAuthenticated=" + this.isUserAuthenticated);
        if (this.isUserAuthenticated == false || this.isUserAuthenticated == undefined) {
          this.router.navigate(['/authentication/login']);
        };
      });

      this.UserId = (Number)(localStorage.getItem('id')?.toString());
      if (this.orderid != undefined && this.orderid > 0) {
        this.getorderbyorderid(this.orderid);
      }

      this.formdata = new FormGroup({
        firstname: new FormControl(""),
        lastname: new FormControl(""),
        addresstype: new FormControl(""),
        country: new FormControl(""),
        state: new FormControl(""),
        city: new FormControl(""),
        street: new FormControl(""),
        house: new FormControl(""),
        pincode: new FormControl(""),
      });

    }
    else {
      this.router.navigate(['']);
    }
  }

  getorderbyorderid(orderid: number) {
    debugger
    this.orderService.getorderbyorderid(orderid).subscribe(res => { this.orderdata = res; console.log(JSON.stringify(res)) });
  }

  placeorder(form: any) {
    debugger
    alert(JSON.stringify(form));
    var addressmodel = form;
    this.formdata = form;
    console.log("house = " + form.house);
    alert(form.house);
    var addressorder: Address = {
      in: {
        id: 0,
        house: form.house,
        street: form.street,
        city: form.city,
        state: form.state,
        country: form.country,
        pincode: form.pincode,
        address_Type: form.address_Type,
        user_Id: (Number)(localStorage.getItem('id')?.toString()),
        order_Id: this.orderid
      }
    }
    if(this.addressService !=undefined)
    {
      this.addressService.addAddress(addressorder).subscribe(res=>{
        if(res >0){
          alert("order placed successfully");
        }
      });
    }
  }
}
