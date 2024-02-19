import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { EncryptStorageService } from './core/services/encrypt-storage.service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const encryptStorageService = inject(EncryptStorageService);
  const router = new Router();

  if (!encryptStorageService.isTokenExpired) {
    let user = encryptStorageService.getCurrentUser();

    if (!user || user === null) router.navigate(['/auth/login']);

    return true;
  }
  router.navigate(['/auth/login']);
  return false;
};
