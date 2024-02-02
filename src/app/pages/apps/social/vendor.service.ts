import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BaseResponse,
  ResultResponse
} from 'src/app/core/models/api-response.model';
import { EndPoints } from 'src/app/core/helpers/end-points.helper';
import {
  UpdateVendorCommend,
  RegisterVendorCommand,
  VendorModel
} from './vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  constructor(private http: HttpClient) {}

  vendor(): Observable<BaseResponse<VendorModel>> {
    return this.http.get<BaseResponse<VendorModel>>(EndPoints.vendor);
  }

  update(model: UpdateVendorCommend): Observable<ResultResponse> {
    return this.http.put<ResultResponse>(EndPoints.vendorUpdate, model);
  }

  register(model: RegisterVendorCommand): Observable<ResultResponse> {
    return this.http.post<ResultResponse>(EndPoints.vendorRegister, model);
  }
}
