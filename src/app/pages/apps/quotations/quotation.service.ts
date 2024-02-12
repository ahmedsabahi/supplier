import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BaseResponse,
  DropDownModel,
  ResultResponse
} from 'src/app/core/models/api-response.model';
import { EndPoints } from 'src/app/core/helpers/end-points.helper';
import { QuotationModel, QuotationSearch } from './quotation.model';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  constructor(private http: HttpClient) {}

  quotations(
    search?: QuotationSearch
  ): Observable<BaseResponse<QuotationModel[]>> {
    return this.http.get<BaseResponse<QuotationModel[]>>(EndPoints.quotations, {
      params: new HttpParams().appendAll(search as any)
    });
  }

  quotation(id: string): Observable<BaseResponse<QuotationModel>> {
    return this.http.get<BaseResponse<QuotationModel>>(
      `${EndPoints.quotations}/${id}`
    );
  }

  units(): Observable<BaseResponse<DropDownModel[]>> {
    return this.http.get<BaseResponse<DropDownModel[]>>(EndPoints.units);
  }

  submit(quotation: QuotationModel): Observable<ResultResponse> {
    return this.http.post<ResultResponse>(EndPoints.submitQuotation, quotation);
  }

  update(quotation: QuotationModel): Observable<ResultResponse> {
    return this.http.put<ResultResponse>(EndPoints.quotations, quotation);
  }

  isThereLowerPrice(quotation: QuotationModel): Observable<ResultResponse> {
    return this.http.put<ResultResponse>(
      EndPoints.isThereLowerPrice,
      quotation
    );
  }
}
