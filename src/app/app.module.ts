import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { AuthenticationService } from './_services/authentication.service';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { RegisterUserComponent } from './authentication/register-user/register-user.component';


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
    LoginComponent,
    RegisterUserComponent
  ],
  imports: [
    AuthenticationModule,
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
    SocialLoginModule,
  ],
  exports: [RouterModule],
  providers: [
    AuthenticationService,
    CategoriesService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '74289081060-7pr600a4n7566n5ufvo4s8bqljvs64sb.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }