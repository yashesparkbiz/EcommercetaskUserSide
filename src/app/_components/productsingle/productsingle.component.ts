import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCartModel } from 'src/app/_interfaces/cartinterface';
import { Products } from 'src/app/_models/products.model';
import { CartService } from 'src/app/_services/cart.service';
import { ProductsService } from 'src/app/_services/products.service';

@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css']
})
export class ProductsingleComponent implements OnInit {
  public id: any;
  product!: Products;
  errorMessage: string = '';
  productcartid!: number;
  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService, private cartService: CartService, private route: Router) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getProductsByProductId(this.id);
    });
  }

  getProductsByProductId(id: number) {
    this.productsService.getbyproductid(id).subscribe((data) => {
      this.product = data; console.log(this.product);
    });
  }

  addtocart(item: Products) {
    debugger
    var UserId = (Number)((localStorage.getItem('id'))?.toString());
    var token = localStorage.getItem("token");
    if (token != undefined && token != '') 
    {
      const cartitem: ProductCartModel =
      {
        in: {
          id: 0,
          product_Id: item.id,
          quantity: item.quantity,
          price: item.price,
          user_Id: UserId,
          is_Active: item.is_Active,
        }
      };

      //  this.cartService.addtocart(cartitem).subscribe({
      //   next: (_) => {console.log("product added in cart successfully");},
      //   error: (err: HttpErrorResponse) => console.log(err.error.errors)
      // });
      var cartid = 0;
      this.cartService.addtocart(cartitem).subscribe(result => {
        debugger
        cartid = result;
      });
      if(cartid > 0)
      {
        cartid=0;
        this.route.navigate(['/cart']);
        this.errorMessage = 'item added to cart successfully.';
      }
      else
      {
        this.errorMessage = 'sorry!!!!! item already available in cart';
        cartid=0;
      }
    }
    else {
      debugger
      this.route.navigate(['/authentication/login']);
    }
  }
}