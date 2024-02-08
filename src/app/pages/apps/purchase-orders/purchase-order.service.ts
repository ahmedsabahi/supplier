import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/core/models/api-response.model';
import { EndPoints } from 'src/app/core/helpers/end-points.helper';
import {
  PurchaseOrderModel,
  PurchaseOrderSearch
} from './purchase-order.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  constructor(private http: HttpClient) {}

  purchaseOrders(
    search?: PurchaseOrderSearch
  ): Observable<BaseResponse<PurchaseOrderModel[]>> {
    return this.http.get<BaseResponse<PurchaseOrderModel[]>>(
      EndPoints.purchaseOrders,
      {
        params: new HttpParams().appendAll(search as any)
      }
    );
  }

  purchaseOrder(id: string): Observable<BaseResponse<PurchaseOrderModel>> {
    return this.http.get<BaseResponse<PurchaseOrderModel>>(
      `${EndPoints.purchaseOrders}/${id}`,
      {
        params: {
          IncludeDetails: true,
          IncludePayments: true,
          IncludeOpportunities: true,
          IncludeFiles: true
        }
      }
    );
  }

  purchaseOrderPDF(id: string): Observable<BaseResponse<string>> {
    return this.http.get<BaseResponse<string>>(
      `${EndPoints.purchaseOrderPdf}/${id}`
    );
  }
}
