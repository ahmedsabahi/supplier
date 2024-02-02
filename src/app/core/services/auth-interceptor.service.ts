import { Observable } from 'rxjs';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EncryptStorageService } from './encrypt-storage.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private encryptStorageService: EncryptStorageService) {}

  _token(): string | null {
    const token = this.encryptStorageService.getToken;
    return token || null;
  }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === '/assets/i18n/ar.json' || !req.url.startsWith('/')) {
      return next.handle(req);
    }
    const token = this._token();

    const headers: any = {};
    if (token) headers.authorization = `Bearer ${token}`;

    const cloned = req.clone({
      url: environment.baseUrl + req.url,
      setHeaders: headers
    });

    return next.handle(cloned);
  }
}
