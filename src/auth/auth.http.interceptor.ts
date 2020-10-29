import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthHttpInterceptorService implements HttpInterceptor {
    constructor(private auth: AuthService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.auth.token$
            .pipe(
                first(),
                switchMap((token) => this.handleToken(token, req, next)));
    }

    private handleToken(token: string, req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (token) {
            const tokenReq = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` },
            });
            return next.handle(tokenReq);
        }
        return next.handle(req);
    }
}
