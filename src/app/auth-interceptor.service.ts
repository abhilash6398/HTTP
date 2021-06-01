import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler){
    // console.log('Request is on its way');
    // console.log(req.url);
    const modifiedrequest= req.clone({url:'a new url',headers: req.headers.append('Auth','xyz')})
    return next.handle(modifiedrequest);
  }
}
