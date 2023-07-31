import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoggingInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Outgoing request to " + request.url);
    console.log(request.headers);
    return next.handle(request).pipe(tap(event => {
      console.log(event);
      if(event.type === HttpEventType.Response) {
        console.log("Incoming response: ");
        console.log(event.body);
      }
    }));
  }
}
