import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/core/models/api-response.model';
import { EndPoints } from 'src/app/core/helpers/end-points.helper';
import { ProductPriceModel, ProductPriceSearch } from './product-price.model';

@Injectable({
  providedIn: 'root'
})
export class ProductPriceService {
  constructor(private http: HttpClient) {}

  productsPrices(
    search?: ProductPriceSearch
  ): Observable<BaseResponse<ProductPriceModel[]>> {
    return this.http.get<BaseResponse<ProductPriceModel[]>>(
      EndPoints.productPrices,
      {
        params: new HttpParams().appendAll(search as any)
      }
    );
  }

  productsPrice(id: string): Observable<BaseResponse<ProductPriceModel>> {
    return this.http.get<BaseResponse<ProductPriceModel>>(
      `${EndPoints.productPrices}/${id}`
    );
  }
}
