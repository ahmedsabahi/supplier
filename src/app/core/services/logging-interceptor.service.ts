import { catchError, Observable, throwError } from 'rxjs';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable()
export class LoggingInterceptorService implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 400 && error.status < 500) {
          // Handle client-side errors
          console.log('This is client side error:', error.error);
        } else if (error.status >= 500 || error.status === 0) {
          // Handle server-side errors
          console.log('This is server side error:', error.error);
        }
        this.errorService.handleError(error);
        return throwError(
          () =>
            new Error(
              `An error occurred: ${error.message}, Status: ${error.status}, ${error.error}`
            )
        );
      })
    );
  }
}
