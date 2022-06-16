import { Component, OnInit } from '@angular/core';
import { Categories } from '../categories.model';
import { CategoriesService } from '../categories.service';
import { SubcategoriesService } from '../subcategories.service';
import { ProductsService } from '../products.service';
import { Subcategories } from '../subcategories.model';
import { Products } from '../products.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categoriesdata: Categories[] = [];
  subcategorydata : Subcategories[] = [];
  productsdata : Products[] = [];
  show: boolean = false;
  showproducts: boolean = false;

  constructor(public categoriesService: CategoriesService, public subcategoriesService: SubcategoriesService, public productsService: ProductsService) { }

  ngOnInit(): void {
    this.getcategorydata();
  }

  getcategorydata(){
    this.categoriesService.get().subscribe((data) => {
       this.categoriesdata = data
    });
  }

  getSubcategories(categoryid: number) {
    this.subcategoriesService.getbyid(categoryid).subscribe((data) => {
       this.subcategorydata = data;
    });
    this.show = true;
  }

  getProductsBySubcategoryId(subcategoryid: number){
    this.productsService.getbysubcategoryid(subcategoryid).subscribe((data) => {
      this.productsdata = data; console.log(this.productsdata);
   });
   this.showproducts= true;
  }
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
}
