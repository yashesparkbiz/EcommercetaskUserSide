import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public UserId! : number;

  constructor(public route: Router) { }
  ngOnInit(): void {
    var token = localStorage.getItem('token');
    if(token==null || token=='')
    {
      this.route.navigate(['/authentication/login']);
    }
    else
    {
       this.UserId = (Number)((localStorage.getItem('id'))?.toString());
    }
  }

}
