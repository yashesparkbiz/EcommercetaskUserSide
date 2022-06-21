import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cartinterface } from 'src/app/_interfaces/cartinterface';
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
  constructor(private activatedRoute: ActivatedRoute, public productsService: ProductsService, public cartService: CartService, public route: Router) { }

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
    alert("hey");
    var token = localStorage.getItem('token');
    var UserId = (Number)((localStorage.getItem('id'))?.toString());
    if (token != null && token != '' && UserId > 0) {
      const cartitem: Cartinterface =
      {
        in: {
          product_Id: item.id,
          quantity: item.quantity,
          price: item.price,
          user_Id: UserId,
          is_Active: item.is_Active,
        }
      };
      var additem : boolean = (Boolean) (this.cartService.addtocart("ProductCart/add-product-cart", cartitem));
      if(additem == true)
      {
        this.route.navigate(['/cart']);
        this.errorMessage = 'item added to cart successfully.';
      }
      else
      {
        this.errorMessage = 'sorry!!!!! item not added to cart';
      }
    }
    else{
      this.route.navigate(['/authentication/login']);
    }
  }
}
