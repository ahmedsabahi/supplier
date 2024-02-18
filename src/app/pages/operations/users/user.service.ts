import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BaseResponse,
  ResultResponse
} from 'src/app/core/models/api-response.model';
import { EndPoints } from 'src/app/core/helpers/end-points.helper';
import { UserModel, UserSearch } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  users(search?: UserSearch): Observable<BaseResponse<UserModel[]>> {
    return this.http.get<BaseResponse<UserModel[]>>(EndPoints.contacts, {
      params: new HttpParams().appendAll(search as any)
    });
  }

  user(id: string): Observable<BaseResponse<UserModel>> {
    return this.http.get<BaseResponse<UserModel>>(
      `${EndPoints.contacts}/${id}`
    );
  }

  create(user: UserModel): Observable<ResultResponse> {
    return this.http.post<ResultResponse>(EndPoints.contacts, user);
  }

  update(user: UserModel): Observable<ResultResponse> {
    return this.http.put<ResultResponse>(EndPoints.contacts, user);
  }
}
