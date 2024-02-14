import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseResponse, ResultResponse } from '../models/api-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(
    public router: Router,
    private injector: Injector,
    private snackBar: MatSnackBar
  ) {}

  handleError(err: any): void {
    // this.snackBar.open("I'm a notification!", 'CLOSE', {
    //   duration: 3000,
    //   horizontalPosition: 'right'
    // });
    this.snackBar.open(
      this.getApiErrorMessage(err) ?? this.getHttpErrorMessage(err.status)
    );
  }

  private getApiErrorMessage(err: any): string | undefined {
    const translateService = this.injector.get(TranslateService);

    const lang = translateService.currentLang;
    const isEn = lang === 'en';
    if (err.error != null && typeof err.error === 'object') {
      if (err.error['totalRecords'] != null) {
        const api = err.error as BaseResponse<any>;
        return isEn ? api.result.messageEn : api.result.messageAr;
      } else if (err.error['status'] != null) {
        const result = err.error as ResultResponse;
        return isEn ? result.messageEn : result.messageAr;
      }
    }
    return undefined;
  }

  private getHttpErrorMessage(status: number): string {
    switch (status) {
      case HttpStatusCodes.INTERNET_CONNECTION:
        this.handleUnauthorizedError();
        return 'لا يمكن الاتصال بالخادم.';
      case HttpStatusCodes.BAD_REQUEST:
        return 'طلب غير صالح. يرجى التحقق من المدخلات الخاصة بك والمحاولة مرة أخرى.';
      case HttpStatusCodes.UNAUTHORIZED:
        this.handleUnauthorizedError();
        return 'غير مصرح به. يرجى تسجيل الدخول والمحاولة مرة أخرى.';
      case HttpStatusCodes.FORBIDDEN:
        return 'تم رفض الوصول. ليس لديك الإذن لأداء هذا الإجراء.';
      case HttpStatusCodes.NOT_FOUND:
        return 'غير موجود. لم يتم العثور على المورد الذي طلبته.';
      case HttpStatusCodes.CONFLICT:
        return 'تعارض. المورد الذي طلبته موجود بالفعل.';
      case HttpStatusCodes.INTERNAL_SERVER_ERROR:
        return 'خطأ في الخادم الداخلي. يرجى المحاولة مرة أخرى في وقت لاحق.';
      default:
        return 'حدث خطأ. يرجى المحاولة مرة أخرى في وقت لاحق.';
    }
  }

  handleUnauthorizedError() {
    this.router.navigate(['/login']);
  }
}

export enum HttpStatusCodes {
  INTERNET_CONNECTION = 0,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NO_BALANCE = 402,
  FORBIDDEN = 403, // & INVALID_MFA_CODE
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}
