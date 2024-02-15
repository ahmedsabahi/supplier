import { Injectable, OnInit } from '@angular/core';
import { EncryptStorage } from 'encrypt-storage';
import { UserModel } from 'src/app/pages/pages/auth/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class EncryptStorageService {
  #encryptStorage: EncryptStorage;

  constructor() {
    this.#encryptStorage = new EncryptStorage('MDD_Vendor');
  }

  get isTokenExpired(): boolean {
    const tokenExpiryDateStr = this.#encryptStorage.getItem('TokenExpiryDate');
    if (tokenExpiryDateStr != undefined) {
      return Date.now() > Date.parse(tokenExpiryDateStr) ? true : false;
    }
    return true; // expired
  }

  get getToken(): string | undefined {
    return this.#encryptStorage.getItem('Token');
  }

  get isLoggedIn(): boolean {
    const token = this.#encryptStorage.getItem('Token');
    return token != undefined && token != '' ? true : false;
  }

  getCurrentUser() {
    return this.#encryptStorage.getItem('CurrentUser');
  }

  cacheUser(user: UserModel) {
    const tokenExpiryDate = new Date();

    this.#encryptStorage.setItem('CurrentUser', JSON.stringify(user));
    this.#encryptStorage.setItem('Token', user.token);
    this.#encryptStorage.setItem(
      'TokenExpiryDate',
      tokenExpiryDate.setHours(tokenExpiryDate.getHours() + 1).toString()
    );
  }

  clear() {
    this.#encryptStorage.removeItem('CurrentUser');
    this.#encryptStorage.removeItem('Token');
    this.#encryptStorage.removeItem('TokenExpiryDate');
  }
}
