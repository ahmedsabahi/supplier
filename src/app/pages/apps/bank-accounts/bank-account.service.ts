import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BaseResponse,
  ResultResponse
} from 'src/app/core/models/api-response.model';
import { EndPoints } from 'src/app/core/helpers/end-points.helper';
import {
  BankAccountModel,
  BankAccountSearch,
  DropDownModel
} from './bank-account.model';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  constructor(private http: HttpClient) {}

  bankAccounts(
    search?: BankAccountSearch
  ): Observable<BaseResponse<BankAccountModel[]>> {
    return this.http.get<BaseResponse<BankAccountModel[]>>(
      EndPoints.bankAccounts,
      {
        params: new HttpParams().appendAll(search as any)
      }
    );
  }

  bankAccount(id: string): Observable<BaseResponse<BankAccountModel>> {
    return this.http.get<BaseResponse<BankAccountModel>>(
      `${EndPoints.bankAccounts}/${id}`
    );
  }

  create(bankAccount: BankAccountModel): Observable<ResultResponse> {
    return this.http.post<ResultResponse>(EndPoints.bankAccounts, bankAccount);
  }

  update(bankAccount: BankAccountModel): Observable<ResultResponse> {
    return this.http.put<ResultResponse>(EndPoints.bankAccounts, bankAccount);
  }

  banks(): Observable<BaseResponse<DropDownModel[]>> {
    return this.http.get<BaseResponse<DropDownModel[]>>(EndPoints.banks);
  }
}
