import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/core/models/api-response.model';
import { EndPoints } from 'src/app/core/helpers/end-points.helper';
import { PaymentModel } from './payments.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  payments(find?: string): Observable<BaseResponse<PaymentModel[]>> {
    return this.http.get<BaseResponse<PaymentModel[]>>(
      EndPoints.payments,

      // {
      //     params: new HttpParams().set("nationalId", model.nationalId),
      //   }

      find
        ? {
            params: { find: find! }
          }
        : {}
    );
  }

  payment(id: string): Observable<BaseResponse<PaymentModel>> {
    return this.http.get<BaseResponse<PaymentModel>>(
      `${EndPoints.payments}/${id}`
    );
  }
}
