import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const dupReq = req.clone({ url: 'http://localhost:5000/api/' + req.url });
        console.log(dupReq.url);
        return next.handle(dupReq);
        
    }
}