import { Injectable, NgModule } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {
    // let headers = request.headers.set('X-Requested-With', 'XMLHttpRequest')
    let tokenInfo = localStorage.getItem('token');
    // if(tokenInfo )
    // {
    //   headers = headers.set("Authorization", `Bearer ${tokenInfo}`)
    // }
    if (tokenInfo ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenInfo}`, 'Content-Type': 'application/json;'
        }
      });
    }
    return newRequest.handle(request);
  }
}

@NgModule({
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true }
  ]
})

export class HttpInterceptorModule { }