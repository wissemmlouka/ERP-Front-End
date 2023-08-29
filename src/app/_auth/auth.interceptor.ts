import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpEvent,
    HttpErrorResponse,
  } from '@angular/common/http';
  import { Observable, catchError, throwError } from 'rxjs';
  import { UserAuthService } from '../_services/user-auth.service';
  import { Router } from '@angular/router';
  import { Injectable } from '@angular/core';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(
      private userAuthService: UserAuthService,
      private router: Router
    ) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      if (req.headers.get('No-Auth') === 'True') {
        return next.handle(req.clone());
      }
  
      const token: any = this.userAuthService.getToken();
      if (token) {
        req = this.addToken(req, token);
      }
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          if (error.status === 401) {
            this.router.navigate(['/login']);
          } else if (error.status === 403) {
            this.router.navigate(['/forbidden']);
          }
          return throwError('some thing is wrong!');
        })
      );
    }
  
    private addToken(request: HttpRequest<any>, token: string) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }