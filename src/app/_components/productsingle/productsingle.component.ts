import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cartinterface } from 'src/app/_interfaces/cartinterface';
import { Products } from 'src/app/_models/products.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
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
    if ( token!=undefined && token!='') {
      const cartitem: Cartinterface =
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
      debugger
       this.cartService.addtocart(cartitem).subscribe({
        next: (_) => {console.log("product added in cart successfully");},
        error: (err: HttpErrorResponse) => console.log(err.error.errors)
      });
      // if(additem == true)
      // {
      //   this.route.navigate(['/cart']);
      //   this.errorMessage = 'item added to cart successfully.';
      // }
      // else
      // {
      //   this.errorMessage = 'sorry!!!!! item not added to cart';
      // }
    }
    else
    {
      this.route.navigate(['/authentication/login']);
    }
  }
}
