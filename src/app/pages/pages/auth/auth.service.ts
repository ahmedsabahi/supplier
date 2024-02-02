import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BaseResponse,
  ResultResponse
} from 'src/app/core/models/api-response.model';
import { UserLoginCommand, UserModel } from './auth.model';
import { EndPoints } from 'src/app/core/helpers/end-points.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(model: UserLoginCommand): Observable<BaseResponse<UserModel>> {
    return this.http.post<BaseResponse<UserModel>>(EndPoints.login, model);
  }

  resetPassword(email: string): Observable<ResultResponse> {
    return this.http.put<ResultResponse>(EndPoints.resetPassword, {
      email: email
    });
  }
}
