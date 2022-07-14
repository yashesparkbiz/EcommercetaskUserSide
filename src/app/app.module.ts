import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_components/header/header.component';
import { FooterComponent } from './_components/footer/footer.component';
import { HomeComponent } from './_components/home/home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesService } from './_services/categories.service';
import { AlertComponent } from './_components/alert/alert.component';
import { ProductsingleComponent } from './_components/productsingle/productsingle.component';
import { CartComponent } from './_components/cart/cart.component';
import { CheckoutComponent } from './_components/checkout/checkout.component';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './_guards/auth.guard';

export function tokenGetter() {
  return localStorage.getItem("token");
}

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: "product-single", component: ProductsingleComponent },
  { path: "product-single/:id", component: ProductsingleComponent },
  { path: "cart", component: CartComponent, canActivate:[AuthGuard] },
  { path: "checkout", component: CheckoutComponent, canActivate:[AuthGuard] },
  { path: "checkout/:orderid", component: CheckoutComponent, canActivate:[AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AlertComponent,
    ProductsingleComponent,
    CartComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
        //disallowedRoutesRoutes: []
      }
    }),
  ],
  exports: [RouterModule],
  providers: [
    CategoriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }