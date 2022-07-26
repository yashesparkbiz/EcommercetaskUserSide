import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Orders } from 'src/app/_models/order.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { OrderService } from 'src/app/_services/order.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Address } from 'src/app/_interfaces/address';
import { AddressService } from 'src/app/_services/address.service';
import { PaymentService } from 'src/app/_services/payment.service';
import { Payment } from 'src/app/_models/payment';
import { Subject } from 'rxjs';

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
  stripeAPIKey:any= 'pk_test_51LNHCqSFSnmoK3QOLMm5Vz1BAIOPoEO1pm74syD26hVepOvG62Hk3A5xlxw5So40cWEfqptGbCLhZmBz6AuIEdD600gtC3LbGC';
  paymentHandler: any = null;
  respayment!:string;
  

  constructor(public router: Router, private authService: AuthenticationService, private route: ActivatedRoute, private orderService: OrderService, 
    private addressService: AddressService, public paymentService:PaymentService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')?.toString() != undefined && localStorage.getItem('token')?.toString() != "") {
      this.route.params.subscribe((params: Params) => this.orderid = params['orderid']);

      this.authService.authChanged.subscribe(res => {
        this.isUserAuthenticated = res;
        console.log("isUserAuthenticated=" + this.isUserAuthenticated);
        if (this.isUserAuthenticated == false || this.isUserAuthenticated == undefined) {
          this.router.navigate(['/authentication/login']);
        };
      });
      this.invokeStripe();
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
        total_Amount: new FormControl(""),
      });

      this.UserId = (Number)(localStorage.getItem('id')?.toString());
      if (this.orderid != undefined && this.orderid > 0) {
        this.getorderbyorderid(this.orderid);
      }
    }
    else {
      this.router.navigate(['/authentication/login']);
    }
  }

  getorderbyorderid(orderid: number) {
    debugger
    this.orderService.getorderbyorderid(orderid).subscribe(res => 
    {
      this.orderdata = res; 
      this.formdata.controls["total_Amount"].setValue(parseInt(this.orderdata.total_Amount.toString())); 
      console.log(JSON.stringify(res)) 
    });
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

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      // script.src = 'https://buy.stripe.com/test_eVadRA0w32Fg1fqfYY';
      script.onload = () => {
        debugger
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeAPIKey,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log("stripeToken onload  "+JSON.stringify(stripeToken));
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  makePayment(amount: any) {
    debugger
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',
      token: async function (stripeToken: any) {
        console.log("stripeToken makepayment  "+JSON.stringify(stripeToken));
        alert('Stripe token generated! '+JSON.stringify(stripeToken.object));
        paymentstripe(stripeToken);
      },
    });

    const paymentstripe = (stripeToken: any) => {
      if(stripeToken.id != "" || stripeToken != undefined || stripeToken != null || stripeToken.id!= undefined)
        {
          const payment: Payment = {
            id: stripeToken.id,
            email: stripeToken.email,
            name: stripeToken.card.name,
            exp_year: stripeToken.card.exp_year,
            exp_month: stripeToken.card.exp_month,
            cvc: 123,
            amount: this.orderdata.total_Amount
          }
          console.log("payment model = " + JSON.stringify(payment));
          debugger
          var takeconfirmation = confirm("Are you sure you want to make payment?");
          if(takeconfirmation == true)
          {
            this.paymentService.makepayment(payment).subscribe(res => {
              alert(res);
            });
          }
          else{
            this.ngOnInit();
          }
          
        }
    }

    
    paymentHandler.open({
      name: 'Ecommercesite',
      description: '',
      amount: amount * 100,
    });
  }
}   